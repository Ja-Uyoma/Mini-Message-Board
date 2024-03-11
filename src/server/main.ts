import express, { Express, Request, Response } from "express";
import ViteExpress from "vite-express";
import { body, validationResult } from "express-validator";

import { router } from "./router.js";
import messages from "./messages.js";

const app: Express = express();

app.use(express.json());
app.use("/api", router);

ViteExpress.listen(app, 3000, () => console.log("Server is listening on port 3000..."));
