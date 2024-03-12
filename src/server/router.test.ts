import express from "express";
import { describe, it } from "vitest";
import { agent } from "supertest";
import { router } from "./router";

const app = express();

app.use("/api", router);

describe("GET /api/messages", function () {
  it("responds with JSON", function (done) {
    agent(app).get("/messages").expect("Content-Type", /json/).expect(200, done);
  });
});
