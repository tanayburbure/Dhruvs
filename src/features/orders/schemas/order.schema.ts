import { z } from "zod";

export const garmentSchema = z.object({
  garmentType: z.string().min(1, "Garment type is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  stitchingCost: z.number().min(0),
});

export const fabricSchema = z.object({
  garmentType: z.string().min(1),
  fabricName: z.string().min(1),
  quantity: z.number().min(1),
  price: z.number().min(0),
});

export const orderSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  mobile: z.string().min(10, "Enter valid mobile number"),
  email: z.string().email("Invalid email"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),

  garments: z.array(garmentSchema).min(1, "Add at least one garment"),
  fabrics: z.array(fabricSchema).optional(),
});

export type OrderFormValues = z.infer<typeof orderSchema>;
