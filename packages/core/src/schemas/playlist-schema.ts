import { z } from "zod";

const CreatePlaylistSchema = z.object({
  title: z.string(),
  description: z.string(),
  filename: z.string(),
  fileKey: z.string(),
});

export {
  CreatePlaylistSchema,
}
