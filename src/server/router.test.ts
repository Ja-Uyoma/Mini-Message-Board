import { describe, expect, test } from "vitest";
import supertest from "supertest";
import app from "./main.ts";
import messages from "./messages.ts";

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

  test("handles retrieval of non-existent messages", function () {
    supertest(app)
      .get("/api/messages/100")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .then((res) => {
        expect(res.body).toBeDefined();
        expect(res.body).toEqual({message: "Message does not exist"});
      })
  });
});