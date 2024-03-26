import express from "express";
import { describe, it } from "vitest";
import supertest from "supertest";
import { router } from "./router.ts";

const app = express();

app.use("/api", router);

describe("GET /api/messages", function () {
  it("responds with JSON", function () {
    supertest(app)
      .get("/messages")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
