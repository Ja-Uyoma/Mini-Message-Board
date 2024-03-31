import { describe, expect, test } from "vitest";
import supertest from "supertest";
import app from "./main.ts";
import messages from "./messages.ts";

describe("Returns the messages in the message object", function () {
  test("GET /api/message returns all messages", function () {
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

  test("GET /api/messages/1 returns the first message", function () {
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

  test("GET /api/messages/2 returns the second message", function () {
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

  test("GET /api/messages/100 handles retrieval of non-existent message", function () {
    supertest(app)
      .get("/api/messages/100")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .then((res) => {
        expect(res.body).toBeDefined();
        expect(res.body).toEqual({ message: "Message does not exist" });
      });
  });
});