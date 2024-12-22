import { z } from "zod";

const CreatePlaylistSchema = z.object({
  title: z.string({ message: 'Please enter title'}).min(1, `Title shouldn't be empty`),
  description: z.string({ message: 'Please enter description' }).min(1, `Description shouldn't be empty`),
  file: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, { message: "File is required" })
    .refine(
      (files) => files[0]?.size <= 5 * 1024 * 1024, // 5 MB
      { message: "File size must be less than 5 MB" }
    )
    .refine(
      (files) =>
        ["image/jpeg", "image/png", "application/pdf"].includes(
          files[0]?.type || ""
        ),
      { message: "Invalid file type. Only JPEG, PNG, and PDF are allowed" }
    ),
});

type CreatePlaylistSchemaType = z.infer<typeof CreatePlaylistSchema>;

export { 
  CreatePlaylistSchema,
  type CreatePlaylistSchemaType,
}
