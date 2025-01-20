import { ZodSchema, ZodError } from "zod";

export const validateBody = <T>(schema: ZodSchema<T>, body: unknown): T => {
  try {
    return schema.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      console.error("Validation Error:", error.errors);
      throw new Error(JSON.stringify(error.errors));
    }
    throw new Error("An unexpected error occurred during validation.");
  }
};
