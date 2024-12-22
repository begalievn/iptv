import { ZodSchema } from "zod";

export const validateBody = <T>(schema: ZodSchema<T>, body: unknown): T => {
  try {
    return schema.parse(body);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
