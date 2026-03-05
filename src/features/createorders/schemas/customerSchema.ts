import { z } from "zod";

export const customerSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters"),

  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter valid 10 digit mobile number"),

  email: z
    .string()
    .email("Enter valid email address"),

  city: z
    .string()
    .min(2, "City is required"),

  state: z
    .string()
    .min(1, "State is required"),
});

export type CustomerFormData = z.infer<typeof customerSchema>;