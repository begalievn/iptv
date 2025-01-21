import { Util } from "@iptv/core/util";
import { PlaylistRepository } from "../repositories/playlist.repository";
import { StorageService } from "../services/storage.service";
import { PlaylistService } from "../services/playlist.service";

const playlistRepo = new PlaylistRepository();
const storageService = new StorageService();
const playlistService = new PlaylistService(playlistRepo, storageService);


export const main = Util.authHandler(async (event) => {
  const userId = event.user.id;
  const { id } = event?.pathParameters || {}; 

  if (!id || !userId) {
    throw new Error("Missing required parameters.");
  }

  await playlistService.deletePlaylist(userId, id);

  return JSON.stringify({ status: true });
}); 
