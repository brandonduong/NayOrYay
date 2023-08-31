import path from "path";
import express from "express";
const PORT = 8081;
const app = express();
app.use(express.static(path.join(__dirname, "../client", "build")));
app.get("/", (req, res) => {
  res.send("just gonna send it");
});
app.get("/flower", (req, res) => {
  res.json({
    name: "Dandelion",
    colour: "Blue-ish",
  });
});
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}.`);
});
