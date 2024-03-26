import express from "express";
import { describe, expect, it } from "vitest";
import supertest from "supertest";
import { router } from "./router.ts";
import messages from "./messages.ts";

const app = express();

app.use("/api", router);

describe("GET /api/messages", function () {
  it("responds with the messages in JSON", function () {
    supertest(app)
      .get("/messages")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(messages);
      });
  });
});