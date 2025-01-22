import { Util } from "@iptv/core/util"
import { StorageService } from "../services/storage.service";
import { UploadService } from "../services/upload.service";

const storageService = new StorageService();
const uploadService = new UploadService(storageService);

export const main = Util.authHandler(async (event) => {
  const body = event.body ? JSON.parse(event.body) : {};
  const userId = event.user.id;

  if (!body.filename) {
    throw new Error("Missing filename in request body");
  }

  const { uploadUrl, fileKey } = await uploadService.getUploadUrl(userId, body.filename);

  return JSON.stringify({ uploadUrl, fileKey });
})