import { describe, expect, test } from "vitest";
import supertest from "supertest";
import app from "./main.ts";
import messages from "./messages.ts";

describe("Returns the messages in the message object", function () {
  test("GET /api/message returns all messages", async function () {
    const res = await supertest(app)
      .get("/api/messages")
      .set("Accept", "application/json");

    expect(res.type).toBe("application/json");
    expect(res.status).toEqual(200);
    expect(res.body).toBeDefined();
    expect(res.body).toEqual(messages);
  });

  test("GET /api/messages/1 returns the first message", async function () {
    const res = await supertest(app)
      .get("/api/messages/1")
      .set("Accept", "application/json");

    expect(res.type).toBe("application/json");
    expect(res.status).toEqual(200);
    expect(res.body).toBeDefined();
    expect(res.body).toEqual(messages[0]);
  });

  test("GET /api/messages/2 returns the second message", async function () {
    const res = await supertest(app)
      .get("/api/messages/2")
      .set("Accept", "application/json");

    expect(res.type).toBe("application/json");
    expect(res.status).toEqual(200);
    expect(res.body).toBeDefined();
    expect(res.body).toEqual(messages[1]);
  });

  test("GET /api/messages/100 handles retrieval of non-existent message", async function () {
    const res = await supertest(app)
      .get("/api/messages/100")
      .set("Accept", "application/json");

    expect(res.type).toBe("application/json");
    expect(res.status).toEqual(400);
    expect(res.body).toBeDefined();
    expect(res.body).toEqual({ message: "Message does not exist" });
  });
});

describe("Create new messages", function () {
  test("POST /api/messages fails to create an empty message", async function () {
    const res = await supertest(app)
      .post("/api/messages")
      .send({ text: "", user: "" })
      .set("Accept", "application/json");

    expect(res.type).toBe("application/json");
    expect(res.status).toEqual(400);
    expect(res.error).toBeDefined();
  });

  test("POST /api/messages creates a new message", async function () {
    const res = await supertest(app)
      .post("/api/messages")
      .send({ text: "Amoso u ni okwe", user: "Mosh" })
      .set("Accept", "application/json");

    expect(res.type).toBe("application/json");
    expect(res.status).toEqual(200);
    expect(res.body).toBeDefined();
  });
});
