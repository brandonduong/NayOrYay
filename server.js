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
  res.status(200).send("alive");
});

const connUrl = `postgres://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`;
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

app.get("/api/categories", async (req, res) => {
  const client = await newClient();
  try {
    console.log("fetching categories: ");

    const q = {
      text: "SELECT * FROM categories ORDER BY count DESC",
    };
    const query = await client.query(q);
    console.log(query.rows);
    res.json({ rows: query.rows });
  } catch (err) {
    console.error("Error retrieving category: ", err);
    res.status(500).json({ message: "Error retrieving category: " + err });
  } finally {
    await client.end();
  }
});

app.post("/api/categories/add", async (req, res) => {
  const id_token = getCookie(req.headers.cookie, "id_token");
  const payload = await verifyToken(id_token);

  // Check if logged in
  if (payload) {
    const client = await newClient();
    try {
      const { name, description } = req.body;
      console.log("adding category: ", name, description);

      const q = {
        text: "INSERT INTO categories(category, count, description, name) VALUES ($1, $2, $3, $4)",
        values: [name.toLowerCase(), 0, description, name],
      };
      const query = await client.query(q);
      if (query.rowCount === 1) {
        res.status(200).json({ message: "Added category" });
      }
    } catch (err) {
      console.error("Error adding category: ", err);
      res.status(500).json({ error: "Error adding category: " + err });
    } finally {
      await client.end();
    }
  }
});

app.post("/api/questions/add", async (req, res) => {
  const id_token = getCookie(req.headers.cookie, "id_token");
  const payload = await verifyToken(id_token);

  // Check if logged in
  if (payload) {
    const client = await newClient();
    try {
      const { text, category } = req.body;
      console.log("adding question: ", text, category);

      if (category.localeCompare("daily")) {
        const q = {
          text: "INSERT INTO questions(ts, yay, nay, text, category, author) VALUES (CURRENT_TIMESTAMP, 0, 0, $1, $2, $3)",
          values: [text, category, payload["cognito:username"]],
        };
        const query = await client.query(q);

        // Check if added question
        if (query.rowCount === 1) {
          // Update category entry
          const q = {
            text: "UPDATE categories SET count=count+1 WHERE category=$1",
            values: [category],
          };
          const query = await client.query(q);

          res.status(200).json({ message: "Added question" });
        }
      }
    } catch (err) {
      console.error("Error adding question: ", err);
      res.status(500).json({ error: "Error adding question: " + err });
    } finally {
      await client.end();
    }
  }
});

app.get("/api/questions/:category", async (req, res) => {
  const client = await newClient();
  try {
    const { category } = req.params;
    console.log("fetching questions: ", category);

    const q = {
      text: "SELECT * FROM questions WHERE category=$1 ORDER BY ts",
      values: [category],
    };
    const query = await client.query(q);
    console.log(query.rows);
    res.json({ rows: query.rows });
  } catch (err) {
    console.error("Error retrieving questions: ", err);
    res.status(500).json({ message: "Error retrieving questions" });
  } finally {
    await client.end();
  }
});

app.get("/api/question/:category/:offset", async (req, res) => {
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
    res.json({ row: query.rows[0] });
  } catch (err) {
    console.error("Error retrieving question: ", err);
    res.status(500).json({ message: "Error retrieving question" });
  } finally {
    await client.end();
  }
});

app.get("/api/votes/:username", async (req, res) => {
  const client = await newClient();
  try {
    const { username } = req.params;
    console.log("fetching votes for: ", username);

    const q = {
      text: "SELECT * FROM votes WHERE username=$1",
      values: [username],
    };
    const query = await client.query(q);
    console.log(query.rows);
    res.json({ rows: query.rows });
  } catch (err) {
    console.error("Error retrieving votes: ", err);
    res.status(500).json({ message: "Error retrieving votes" });
  } finally {
    await client.end();
  }
});

app.post("/api/vote", async (req, res) => {
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
        text: "SELECT * FROM votes WHERE username=$1 AND questionid=$2",
        values: [payload["cognito:username"], id],
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
            text: "INSERT INTO votes (username, questionid, vote) VALUES ($1, $2, $3)",
            values: [payload["cognito:username"], id, vote],
          };
          await client.query(voteQ);
        }

        res.json({ message: "Voted!" });
      } else {
        res.status(200).json({ message: "Have already voted" });
      }
    } catch (err) {
      console.error("Error retrieving question: ", err);
      res.status(500).json({ message: "Error retrieving question" });
    } finally {
      await client.end();
    }
  } else {
    res.status(500).json({ message: "Invalid token or vote" });
  }
});

app.get("/api/profile/:username", async (req, res) => {
  const client = await newClient();
  try {
    const { username } = req.params;
    console.log("fetching profile for: ", username);

    const q = {
      text: "SELECT * FROM votes INNER JOIN questions ON votes.questionid = questions.id WHERE username=$1 ORDER BY ts",
      values: [username],
    };
    const query = await client.query(q);
    console.log(query.rows);
    res.json({ rows: query.rows });
  } catch (err) {
    console.error("Error retrieving votes: ", err);
    res.status(500).json({ message: "Error retrieving votes" });
  } finally {
    await client.end();
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}.`);
});
