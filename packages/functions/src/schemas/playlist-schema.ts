import { z } from "zod";

const CreatePlaylistSchema = z.object({
  title: z.string({ message: 'title is required' }),
  description: z.string({ message: 'descriptoin is required' }),
  filename: z.string({ message: 'filename is required' }),
  fileKey: z.string({ message: 'fileKey is required' }),
});

export {
  CreatePlaylistSchema,
}
