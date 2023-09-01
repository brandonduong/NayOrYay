import path from "path";
import express from "express";
import { Client } from "pg";

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

app.get("/categories", async (req, res) => {
  const client = await newClient();
  try {
    console.log("fetching categories: ");

    const q = {
      text: "SELECT category, count(*) FROM questions GROUP BY category",
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
      values: [category, offset],
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

app.post("/vote", async (req, res) => {
  const client = await newClient();
  try {
    const { id, vote } = req.body;
    console.log("voting question: ", id, vote);

    let text;
    if (!vote.localeCompare("yay")) {
      text = "UPDATE questions SET first=first+1 WHERE id=$1";
    } else {
      text = "UPDATE questions SET second=second+1 WHERE id=$1";
    }

    const q = {
      text,
      values: [id],
    };
    await client.query(q);
    res.status(200);
  } catch (err) {
    console.error("Error retrieving question: ", err);
    res.status(500).send({ message: "Error retrieving question" });
  } finally {
    await client.end();
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}.`);
});
