import { z } from "zod";

/* ---------------- GARMENT ---------------- */

export const garmentSchema = z.object({
  garmentType: z.string().min(1, "Garment type is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  stitchingCost: z.number().min(0),
  total: z.number().min(0),
});

/* ---------------- FABRIC ---------------- */

export const fabricSchema = z.object({
  garmentType: z.string().min(1, "Garment type is required"),
  fabricName: z.string().min(1, "Fabric name is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  price: z.number().min(0, "Price must be positive"),
  total: z.number().min(0),
});

/* ---------------- MEASUREMENTS ---------------- */

export const measurementsSchema = z.object({
  shoulder: z.number().optional(),
  sleeveLength: z.number().optional(),
  chest: z.number().optional(),
  stomach: z.number().optional(),
  neck: z.number().optional(),
  frontShoulder: z.number().optional(),
  backShoulder: z.number().optional(),
  length: z.number().optional(),
  waist: z.number().optional(),
  hip: z.number().optional(),
  front: z.number().optional(),
  thigh: z.number().optional(),
  knee: z.number().optional(),
  legOpening: z.number().optional(),
  bottom: z.number().optional(),
});

/* ---------------- ORDER ---------------- */

export const orderSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  mobile: z.string().min(10, "Mobile number must be valid"),
  email: z.string().email("Invalid email").optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),

  garments: z.array(garmentSchema),

  // Replaced z.any() with proper schema
  fabrics: z.array(fabricSchema),
  deliveryDate: z.date().optional(),
  specialInstructions: z.string().optional(),
  measurements: measurementsSchema,
});

export type OrderFormValues = z.infer<typeof orderSchema>;
