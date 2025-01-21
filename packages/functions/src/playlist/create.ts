import { Util } from "@iptv/core/util";

import { validateBody } from "../util/validate-body";
import { CreatePlaylistSchema } from "../schemas/playlist-schema";
import { PlaylistRepository } from "../repositories/playlist.repository";
import { StorageService } from "../services/storage.service";
import { PlaylistService } from "../services/playlist.service";

const playlistRepo = new PlaylistRepository();
const storageService = new StorageService();
const playlistService = new PlaylistService(playlistRepo, storageService);

export const main = Util.authHandler(async (event) => {
  const userId = event.user.id;
  const body = JSON.parse(event.body || '');
  const validatedBody = validateBody(CreatePlaylistSchema, body);

  const playlist = await playlistService.createPlaylist(userId, validatedBody);
  return JSON.stringify(playlist);
});
