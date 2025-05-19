import { z } from "zod";

const CreateSessionSchema = z.object({
  code: z.string({ message: 'code is required' }),
});

export {
  CreateSessionSchema,
}
