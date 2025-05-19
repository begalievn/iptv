import { Playlist } from "../entities/playlist.entity";

export interface IPlaylistRepository {
  create(playlist: Playlist): Promise<Playlist>;
  getById(userId: string, playlistId: string): Promise<Playlist | null>;
  getByMacAddress(userId: string, macAddress: string): Promise<Playlist[]>;
  listByUser(userId: string): Promise<Playlist[]>;
  update(userId: string, playlistId: string, updates: Partial<Playlist>): Promise<void>;
  delete(userId: string, playlistId: string): Promise<void>;
}
