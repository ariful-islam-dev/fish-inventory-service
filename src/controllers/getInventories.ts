import { NextFunction, Request, Response } from "express"
import prisma from "../../prisma";
import { query } from "../utils";


const getInventories = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const sortType = req.query.sortType ? req.query.sortType as string : "desc";
    const sortBy = req.query.sortBy ? req.query.sortBy as string : "createdAt";
    const search = req.query.search ? req.query.search as string : "";
    try{

      
        const inventories = await prisma.inventory.findMany({
          skip: (page - 1) * limit,
          take: limit,
          orderBy: {
            [sortBy]: sortType
          }
        });

        const data = query.getTransformItems(
            inventories,
            ["id", "sku", "name", "price", "quantity", "createdAt"],
            "/inventories"
        );

        // pagination
        const totalItems = await prisma.inventory.count();
        const pagination = query.getPagination(totalItems, page, limit);

        // links
        const links = query.getHateOsLinks(req.url, !!pagination["next"], !!pagination["prev"], req.path, req.query, page);

        // generate response
        const response = {
          code: 200,
          message: 'Get All Inventories',
          data: data,
          pagination,
          links
        } 
        res.status(200).json(response);
    }catch(error){
        next(error)
    }
  }

export default getInventories