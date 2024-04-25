import request from "supertest";
import app from "../src/app";
import { describe, it } from "node:test";

describe("POST /inventories", () => {
  it("should create a new inventory", async () => {
    await request(app)
      .post("/inventories")
      .send({
        productId: "product127",
        sku: "SL-007",
        quantity: 0
      })
      .expect(201);
  });
});
