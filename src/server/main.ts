import express, { Express, Request, Response } from "express";
import ViteExpress from "vite-express";
import { body, validationResult } from "express-validator";

import messages from "./messages.js";

const app: Express = express();

app.use(express.json());

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

app.post(
  "/api/messages",
  [
    body("text").isString().notEmpty().withMessage("Text cannot be empty!"),
    body("user").isString().notEmpty().withMessage("User cannot be empty!"),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { text, user }: { text: string; user: string } = req.body;

    messages.push({ text: text, user: user, added: new Date() });
    res.json(messages[messages.length - 1]);
  }
);

ViteExpress.listen(app, 3000, () => console.log("Server is listening on port 3000..."));
