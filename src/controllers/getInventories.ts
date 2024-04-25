import { NextFunction, Request, Response } from "express"
import prisma from "../../prisma";


const getInventories = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try{
        const inventories = await prisma.inventory.findMany();
        res.status(200).json({
            code: 200,
            message: "Get All Inventories",
            data: inventories
        });
    }catch(error){
        next(error)
    }
  }

export default getInventories