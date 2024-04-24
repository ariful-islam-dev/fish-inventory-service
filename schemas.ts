import { z } from "zod";

export const InventoryCreateDTOSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
  sku: z.string(),
});
