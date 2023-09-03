import path from "path";
import express from "express";
import { Client } from "pg";
import { CognitoJwtVerifier } from "aws-jwt-verify";

require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.HTTP_PORT || 4001;
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "client", "build")));

app.get("/", (req, res) => {
  res.send("alive");
});

const connUrl = `postgres://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DATABASE}`;
async function newClient() {
  const client = new Client({
    connectionString: connUrl,
    ssl: { sslmode: "require", rejectUnauthorized: false },
  });
  await client.connect();
  return client;
}

function getCookie(cookieString, cname) {
  if (cookieString) {
    let name = cname + "=";
    let ca = cookieString.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
  }
  return "";
}

async function verifyToken(id_token) {
  // Verifier that expects valid access tokens:
  const verifier = CognitoJwtVerifier.create({
    userPoolId: process.env.USER_POOL_ID,
    tokenUse: "id",
    clientId: process.env.CLIENT_ID,
  });

  let payload;
  try {
    payload = await verifier.verify(id_token);
    console.log("Token is valid. Payload:", payload);
  } catch {
    console.log("Token not valid!");
  }
  return payload;
}

app.get("/categories", async (req, res) => {
  const client = await newClient();
  try {
    console.log("fetching categories: ");

    const q = {
      text: "SELECT * FROM categories ORDER BY id",
    };
    const query = await client.query(q);
    console.log(query.rows);
    res.send(query.rows);
  } catch (err) {
    console.error("Error retrieving category: ", err);
    res.status(500).send({ message: "Error retrieving category" });
  } finally {
    await client.end();
  }
});

app.get("/questions", async (req, res) => {
  const client = await newClient();
  try {
    console.log("fetching questions");

    const query = await client.query("SELECT * FROM questions");
    console.log(query.rows);
    res.send(query.rows);
  } catch (err) {
    console.error("Error retrieving questions: ", err);
    res.status(500).send({ message: "Error retrieving questions" });
  } finally {
    await client.end();
  }
});

app.get("/question/:category/:offset", async (req, res) => {
  const client = await newClient();
  try {
    const { offset, category } = req.params;
    console.log("fetching question: ", category, offset);

    const q = {
      text: "SELECT * FROM questions WHERE category=$1 ORDER BY ts OFFSET $2 LIMIT 1",
      values: [category, offset - 1],
    };
    const query = await client.query(q);
    console.log(query.rows[0]);
    res.send(query.rows[0]);
  } catch (err) {
    console.error("Error retrieving question: ", err);
    res.status(500).send({ message: "Error retrieving question" });
  } finally {
    await client.end();
  }
});

app.get("/votes/:sub", async (req, res) => {
  const client = await newClient();
  try {
    const { sub } = req.params;
    console.log("fetching votes for: ", sub);

    const q = {
      text: "SELECT * FROM votes WHERE sub=$1",
      values: [sub],
    };
    const query = await client.query(q);
    console.log(query.rows);
    res.send(query.rows);
  } catch (err) {
    console.error("Error retrieving votes: ", err);
    res.status(500).send({ message: "Error retrieving votes" });
  } finally {
    await client.end();
  }
});

app.post("/vote", async (req, res) => {
  const client = await newClient();
  const { id, vote } = req.body;
  console.log("voting question: ", id, vote);
  const id_token = getCookie(req.headers.cookie, "id_token");
  const payload = await verifyToken(id_token);

  // Check valid vote
  if (payload && (!vote.localeCompare("yay") || !vote.localeCompare("nay"))) {
    try {
      // Check if user didn't already vote for this question
      const voteQ = {
        text: "SELECT * FROM votes WHERE sub=$1 AND questionid=$2",
        values: [payload.sub, id],
      };
      const votes = await client.query(voteQ);
      if (votes.rows.length === 0) {
        // Update question counter
        let text;
        if (!vote.localeCompare("yay")) {
          text = "UPDATE questions SET yay=yay+1 WHERE id=$1";
        } else {
          text = "UPDATE questions SET nay=nay+1 WHERE id=$1";
        }

        const q = {
          text,
          values: [id],
        };

        const query = await client.query(q);

        // Check if id is valid
        if (query.rowCount === 1) {
          // Add vote
          const voteQ = {
            text: "INSERT INTO votes (sub, questionid, vote) VALUES ($1, $2, $3)",
            values: [payload.sub, id, vote],
          };
          await client.query(voteQ);
        }

        res.status(200).send({ message: "Voted!" });
      } else {
        res.status(500).send({ message: "Have already voted" });
      }
    } catch (err) {
      console.error("Error retrieving question: ", err);
      res.status(500).send({ message: "Error retrieving question" });
    } finally {
      await client.end();
    }
  } else {
    res.status(500).send({ message: "Invalid token or vote" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}.`);
});
