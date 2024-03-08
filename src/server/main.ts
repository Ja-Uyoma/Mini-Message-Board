import express, { Express, Request, Response } from "express";
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

const app: Express = express();

app.get("/api/messages", (req: Request, res: Response) => {
  res.json(messages);
});

app.get("/api/messages/:messageID", (req: Request, res: Response) => {
  const id = Number(req.params.messageID);

  if (id >= messages.length) {
    res.status(400).json({ message: "Message does not exist" });
  }

  res.json(messages[id - 1]);
});

ViteExpress.listen(app, 3000, () => console.log("Server is listening on port 3000..."));
