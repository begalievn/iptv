import { z } from "zod";

// Utility function to validate file extensions
const validateFileExtension = (
  filename: string,
  allowedExtensions: string[]
) => {
  const fileExtension = filename.split(".").pop()?.toLowerCase();
  return allowedExtensions.includes(fileExtension || "");
};

// Allowed extensions for both URL and file
const allowedExtensions = ["m3u", "m3u8"];
const macAddressRegex = /^([0-9A-Fa-f]{2}[:-]?){5}([0-9A-Fa-f]{2})$/;

const CreatePlaylistSchema = z
  .object({
    title: z
      .string({ message: "Please enter title" })
      .min(1, `Title shouldn't be empty`),
    description: z.string({ message: "Please enter description" }),
    mac_address: z
      .string({ message: "Please enter MAC address" })
      .regex(macAddressRegex, { message: "Invalid MAC address format" }),
    playlistUrl: z
      .string({ message: "Please enter a playlist URL" })
      .optional(),
    files: z.instanceof(FileList).optional(),
  })
  .superRefine((arg, ctx) => {
    // Check if neither playlistUrl nor file is provided
    if (!arg.playlistUrl && (!arg.files || arg.files.length === 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "You must provide either a playlist URL or a file",
        path: ["files"],
      });
    }

    // Validate playlistUrl if provided
    if (
      arg.playlistUrl &&
      !validateFileExtension(arg.playlistUrl, allowedExtensions)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "URL must point to an M3U or M3U8 file",
        path: ["playlistUrl"],
      });
    }

    // Validate file if provided
    if (arg.files && arg.files.length > 0) {
      const fileName = arg.files[0]?.name || "";
      if (!validateFileExtension(fileName, allowedExtensions)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid file type. Only M3U and M3U8 files are allowed",
          path: ["files"],
        });
      }
    }
  });

const UpdatePlaylistSchema = CreatePlaylistSchema.superRefine(() => {});

type CreatePlaylistSchemaType = z.infer<typeof CreatePlaylistSchema>;
type UpdatePlaylistSchemaType = z.infer<typeof UpdatePlaylistSchema>;

export {
  CreatePlaylistSchema,
  UpdatePlaylistSchema,
  type CreatePlaylistSchemaType,
  type UpdatePlaylistSchemaType,
};
