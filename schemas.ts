import { ActionType } from "@prisma/client";
import { z } from "zod";

export const InventoryCreateDTOSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
  sku: z.string()
});


export const InventoryUpdateDTOSchema = z.object({
  quantity: z.number().int(),
  actionType: z.nativeEnum(ActionType)
})