import { z } from "zod";

export const CountrySchema = z.object({
  idCountry: z.number(),
  countryCode: z.string().nullable(),
  countryName: z.string().nullable(),
  currencyCode: z.string().nullable(),
  continent: z.string().nullable(),
});

export const CreateCountrySchema = z.object({
  countryCode: z.string().nullable(),
  countryName: z.string().nullable(),
  currencyCode: z.string().nullable(),
  continent: z.string().nullable(),
});

export const UpdateCountrySchema = CountrySchema;
