import express, { Express } from "express";
import ViteExpress from "vite-express";
import logger from "morgan";

import { router } from "./router.js";

const app: Express = express();

app.use(express.json());
app.use(logger("dev"));
app.use("/api", router);

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);

export default app;
