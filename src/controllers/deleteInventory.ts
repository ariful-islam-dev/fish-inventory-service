import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma";

const deleteInventory = async (req: Request, res: Response, next:NextFunction) => {
    try{
        const {id} = req.params
        const inventory = await prisma.inventory.findUnique({
            where: {
                id
            }
        })
        if(!inventory){
            return res.status(404).json({
                code: 404,
                message: "Inventory not found"
            })
        }
        await prisma.history.deleteMany({
            where: {
                inventoryId: id
            }
        })
         await prisma.inventory.delete({
            where: {
                id
            }
        })

        res.status(200).json({
            code: 200,
            message: "Inventory Deleted Successfully",
            data: inventory
        })
    }catch(err){
        next(err)
    }
}

export default deleteInventory