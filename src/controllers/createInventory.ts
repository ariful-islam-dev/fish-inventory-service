import prisma from "../../prisma";
import { InventoryCreateDTOSchema } from "../../schemas";
import { NextFunction, Request, Response } from "express";

const createInventory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // validate Request Body
    const parseBody = InventoryCreateDTOSchema.safeParse(req.body);
    if (!parseBody.success) {
      return res
        .status(400)
        .json({ code: 400, message: parseBody.error.errors });
    }

    // create inventory
    const inventory = await prisma.inventory.create({
      data: {
        ...parseBody.data,
        histories: {
          create: {
            actionType: "IN",
            quantityChange: parseBody.data.quantity,
            lastQuantity: 0,
            newQuantity: parseBody.data.quantity,
          },
        },
      },
      select: {
        id: true,
        quantity: true,
      },
    });
    inventory['link']=`/inventories/${inventory.id}`
    return res.status(201).json({
      code: 201,
      message: "Inventory Created",
      data: inventory,
    });
  } catch (error) {
    next(error);
  }
};

export default createInventory;
