import { Playlist } from "../entities/playlist.entity";

export interface IPlaylistRepository {
  create(playlist: Playlist): Promise<Playlist>;
  getById(userId: string, playlistId: string): Promise<Playlist | null>;
  listByUser(userId: string): Promise<Playlist[]>;
  update(userId: string, playlistId: string, updates: Partial<Playlist>): Promise<void>;
  delete(userId: string, playlistId: string): Promise<void>;
}
