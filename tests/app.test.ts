import request from "supertest";
import app from "../src/app";
import { describe, it } from "node:test";

describe("POST /inventories", () => {
  it("should create a new inventory", async () => {
    await request(app)
      .post("/inventories")
      .send({
        productId: "product129",
        sku: "SL-009",
        quantity: 0
      })
      .expect(201);
  });


  it("should all inventories", async () => {
    await request(app)
      .get("/inventories")
      .expect(200);
  })
});
