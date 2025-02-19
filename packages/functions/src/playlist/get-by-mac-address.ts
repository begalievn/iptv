import { Util } from "@iptv/core/util";
import { StorageService } from "../services/storage.service";
import { PlaylistService } from "../services/playlist.service";
import { PlaylistRepository } from "../repositories/playlist.repository";

const playlistRepo = new PlaylistRepository();
const storageService = new StorageService();
const playlistService = new PlaylistService(playlistRepo, storageService);

export const main = Util.authHandler(async (event) => {
  const { macAddress } = event?.pathParameters || {};
  const userId = event.user.id;

  if (!macAddress || !userId) {
    throw new Error("Missing required parameters.");
  }
  const playlist = await playlistService.getByMacAddress(userId, macAddress);

  return JSON.stringify(playlist);
});
