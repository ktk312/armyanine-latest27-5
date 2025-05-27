import { z } from "zod";

export const dogSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  sex: z.enum(["male", "female"], { message: "Invalid sex" }),
  breed: z.string().min(1, { message: "Breed is required" }),
  accNumber: z.string().min(1, { message: "Account number is required" }),
  microchip: z.string().min(1, { message: "Microchip is required" }),
  status: z.enum(["Active", "Pending", "Sold"], { message: "Invalid status" }),
});

export type DogSchema = z.infer<typeof dogSchema>;