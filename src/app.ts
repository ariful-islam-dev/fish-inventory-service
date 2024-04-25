import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { createInventory } from "./controllers";

const app = express();

app.use([express.json(), cors(), morgan("dev")]);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Routes
app.get("/inventories", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    code: 200,
    message: "Get All Inventories",
  });
});

app.post("/inventories", createInventory);
// 404 Error
app.use((req, res, next) => {
  res.status(404).json({ code: 404, message: " Resource Not Found" });
});
// Error
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ code: 500, message: "Internal Server Error" });
});

export default app;
