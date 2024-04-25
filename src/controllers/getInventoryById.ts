import { NextFunction, Request, Response } from "express"
import prisma from "../../prisma";
import getInventories from "./getInventories";

const getInventoryById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try{
        // check if the inventory exists
        const {id}= req.params;
        const inventory = await prisma.inventory.findUnique({
            where: {id},
            include: {
                histories: {
                    orderBy: {
                        createdAt: "desc"
                    }
                }
            }
        })

        if(!inventory){
            return res.status(404).json({
                code: 404,
                message: "Inventory not found"
            })
        }

        res.status(200).json({
            code: 200,
            message: "Get Specific Inventory Successfully",
            data: inventory
        })
    }catch(error){
        next(error)
    }
  };

  export default getInventoryById;