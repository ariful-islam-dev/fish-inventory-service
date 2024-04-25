import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma";
import { InventoryUpdateDTOSchema } from "../../schemas";

const updateInventory = async (
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    try{

        // check if the inventory exists
        const {id}=req.params;
        const inventory = await prisma.inventory.findUnique({
            where: {id}
        });

        if(!inventory){
            return res.status(404).json({
                code: 404,
                message: "Inventory not found"
            })
        }

        // update inventory
        const parseBody = InventoryUpdateDTOSchema.safeParse(req.body);
        if(!parseBody.success){
            return res.status(400).json({
                code: 400,
                message: parseBody.error.errors
            })
        }

        // find the last history
        const lastHistory = await prisma.history.findFirst({
            where: {
                inventoryId: id
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        // calculate the new quantity
        let newQuantity = inventory.quantity;
        if(parseBody.data.actionType === "IN"){
            newQuantity += parseBody.data.quantity;
        }else{
            newQuantity -= parseBody.data.quantity;
        }

        // update the inventory
        const updateInventory = await prisma.inventory.update({
            where: {
                id
            },
            data:{
                quantity: newQuantity,
                histories: {
                    create: {
                        actionType: parseBody.data.actionType,
                        quantityChange: parseBody.data.quantity,
                        lastQuantity: lastHistory?.newQuantity||0,
                        newQuantity
                    }
                }
            },
            select: {
                id: true,
                quantity: true
            }
        })
        return res.status(200).json({
            code: 200,
            message: "Update Inventory Successfully",
            data: updateInventory
        })

    }catch(error){
        next(error)
    }
}

export default updateInventory;