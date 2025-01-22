import { Util } from "@iptv/core/util";
import { PlaylistRepository } from "../repositories/playlist.repository";
import { StorageService } from "../services/storage.service";
import { PlaylistService } from "../services/playlist.service";

const playlistRepo = new PlaylistRepository();
const storageService = new StorageService();
const playlistService = new PlaylistService(playlistRepo, storageService);

export const main = Util.authHandler(async (event) => {
  const userId = event.user.id;

  const playlists = await playlistService.listPlaylists(userId);

  return JSON.stringify(playlists);
});
