import { Util } from "@iptv/core/util";
import { StorageService } from "../services/storage.service";
import { PlaylistService } from "../services/playlist.service";
import { PlaylistRepository } from "../repositories/playlist.repository";

const playlistRepo = new PlaylistRepository();
const storageService = new StorageService();
const playlistService = new PlaylistService(playlistRepo, storageService);

export const main = Util.authHandler(async (event) => {
  const { id } = event?.pathParameters || {};
  const userId = event.user.id;

  if (!id || !userId) {
    throw new Error("Missing required parameters.");
  }
  const playlist = await playlistService.get(userId, id);

  return JSON.stringify(playlist);
});
