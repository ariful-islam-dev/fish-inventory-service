import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { InventoryCreateDTOSchema } from "@/schemas";
import prisma from "@/prisma";
dotenv.config();

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

app.post(
  "/inventories",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // validate Request Body
      const parseBody = InventoryCreateDTOSchema.safeParse(req.body);
      if (!parseBody.success) {
        return res
          .status(400)
          .json({ code: 400, error: parseBody.error.errors });
      }

      // create inventory
      const inventory = await prisma;
    } catch (error) {
      next(error);
    }
  }
);
// 404 Error
app.use((req, res, next) => {
  res.status(404).json({ code: 404, message: " Resource Not Found" });
});
// Error
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ code: 500, message: "Internal Server Error" });
});
const PORT = process.env.PORT || 4003;

app.listen(PORT, () => {
  console.log(`Inventory Server is running on http://localhost:${PORT}`);
});
