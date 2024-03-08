import express from "express";
import ViteExpress from "vite-express";

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

const app = express();

app.get("/api/messages", (req, res) => {
  res.json(messages);
});

ViteExpress.listen(app, 3000, () => console.log("Server is listening on port 3000..."));
