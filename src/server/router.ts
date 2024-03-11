import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import messages from "./messages.js";

const router = express.Router();

router.get("/messages", (req: Request, res: Response) => {
  res.json(messages);
});

router.get("/messages/:messageID", (req: Request, res: Response) => {
  const id = Number(req.params.messageID);

  if (id >= messages.length) {
    res.status(400).json({ message: "Message does not exist" });
  }

  res.json(messages[id - 1]);
});

router.post(
  "/messages",
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

export { router };
