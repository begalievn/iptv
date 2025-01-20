import { z } from "zod";

const CreatePlaylistSchema = z.object({
  title: z.string({ message: 'title is required' }),
  description: z.string({ message: 'descriptoin is required' }),
  mac_address: z.string({ message: 'mac_address is required' }),
  filename: z.string({ message: 'filename is required' }).optional(),
  fileKey: z.string({ message: 'fileKey is required' }).optional(),
  playlistUrl: z.string().optional(),
}).superRefine((arg, ctx) => {
  if (!arg.fileKey && !arg.playlistUrl) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Either a playlistUrl or a fileKey should be provided'
    });
  }
});

const UpdatePlaylistSchea = CreatePlaylistSchema;

export {
  CreatePlaylistSchema,
  UpdatePlaylistSchea,
}
