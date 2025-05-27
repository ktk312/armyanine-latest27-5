import { z } from "zod";

export const CitySchema = z.object({
  id: z.number(),
  countryId: z.number(),
  city: z.string().nullable(),
  status: z.string().nullable(),
});

export const CreateCitySchema = z.object({
  countryId: z.number(),
  city: z.string().nullable(),
  status: z.string().nullable(),
});

export const UpdateCitySchema = CitySchema;
