import express from "express";
import { describe, expect, test } from "vitest";
import supertest from "supertest";
import { router } from "./router.ts";
import messages from "./messages.ts";

const app = express();

app.use(express.json());
app.use("/api", router);

describe("GET /api/messages", function () {
  test("responds with the messages in JSON", function () {
    supertest(app)
      .get("/api/messages")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toBeDefined();
        expect(res.body).toEqual(messages);
      })
  });
});

describe("GET /api/messages/:messageID", function () {
  test("returns the first message", function () {
    supertest(app)
      .get("/api/messages/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toBeDefined();
        expect(res.body).toEqual(messages[0]);
      });
  });

  test("returns the second message", function () {
    supertest(app)
      .get("/api/messages/2")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toBeDefined();
        expect(res.body).toEqual(messages[1]);
      });
  });
});