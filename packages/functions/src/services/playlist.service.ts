import { IPlaylistRepository } from "../interfaces/playlist-repository.interface";
import { Playlist } from "../entities/playlist.entity";
import * as uuid from "uuid";
import { IStorageService } from "../interfaces/storage-service.interface";

export class PlaylistService {
  constructor(
    private playlistRepo: IPlaylistRepository,
    private storageService: IStorageService
  ) {}

  async create(
    userId: string,
    data: Partial<Playlist>
  ): Promise<Playlist> {
    const playlist = new Playlist({
      userId,
      id: uuid.v4(),
      title: data.title!,
      description: data.description,
      mac_address: data.mac_address,
      filename: data.filename,
      fileKey: data.fileKey,
      playlistUrl: data.playlistUrl,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return await this.playlistRepo.create(playlist);
  }

  async delete(userId: string, playlistId: string): Promise<void> {
    const playlist = await this.playlistRepo.getById(userId, playlistId);
    if (!playlist) throw new Error("Playlist not found");

    if (playlist.fileKey) {
      await this.storageService.deleteFile(playlist.fileKey);
    }

    await this.playlistRepo.delete(userId, playlistId);
  }

  async get(
    userId: string,
    playlistId: string
  ): Promise<Playlist | null> {
    const playlist = await this.playlistRepo.getById(userId, playlistId);
    if (playlist?.fileKey) {
      playlist.presignedUrl = await this.storageService.getSignedUrl(
        playlist.fileKey
      );
    }
    return playlist;
  }

  async getByMacAddress(
    userId: string,
    macAddress: string
  ): Promise<Playlist[]> {
    const playlist = await this.playlistRepo.getByMacAddress(
      userId,
      macAddress
    );

    return playlist;
  }

  async list(userId: string): Promise<Playlist[]> {
    return this.playlistRepo.listByUser(userId);
  }

  async update(
    userId: string,
    playlistId: string,
    updates: Partial<Playlist>
  ): Promise<void> {
    const existingPlaylist = await this.playlistRepo.getById(
      userId,
      playlistId
    );
    if (!existingPlaylist) {
      throw new Error("Playlist not found");
    }

    updates.updatedAt = new Date().toISOString();

    await this.playlistRepo.update(userId, playlistId, updates);
  }
}
