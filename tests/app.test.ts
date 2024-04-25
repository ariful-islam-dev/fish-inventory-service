import request from "supertest";
import app from "../src/app";
import { describe, it } from "node:test";


describe("inventories", () => {
  it("should create a new inventory", async () => {

    // const expect = chai.expect;
    await request(app)
      .post("/inventories")
      .send({
        productId: "product133",
        sku: "SL-033",
        quantity: 0
      })
      .expect(201);
      // .then((res) => {
      //   expect(res.text).to.equal("Inventory Created");
      // })
  });


  it("should all inventories", async () => {
    await request(app)
      .get("/inventories")
      .expect(200);
  })
});

describe("/inventories/:id", async()=>{

  it("should get inventory by id", async()=>{
    // const expect = chai.expect;
    await request(app)
      .get("/inventories/clveidnc00000ptora5edw5ow")
      .expect(200);
      
  })

  it("should update inventory by id", async()=>{
    await request(app)
      .put("/inventories/clveidnc00000ptora5edw5ow")
      .send({
        
          quantity: 10,
          actionType:"IN"
      
      })
      .expect(200);
  })
})
