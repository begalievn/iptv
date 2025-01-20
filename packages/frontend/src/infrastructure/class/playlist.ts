import { IPlaylist } from "../../../../core/src/interfaces";

export class Playlist {
  id: string;
  title: string;
  description: string;
  fileKey: string;
  filename: string;
  createdAt: Date;
  updatedAt: Date;
  presignedUrl: string | null;
  playlistUrl: string | null;
  mac_address: string;

  constructor(data: IPlaylist) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.mac_address = data.mac_address;
    this.fileKey = data.fileKey;
    this.filename = data.filename;
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);
    this.presignedUrl = data.presignedUrl ? data.presignedUrl : null;
    this.playlistUrl = data.playlistUrl ? data.playlistUrl : null;
  }

  getSourceUrl(): string {
    return this.playlistUrl ?? this.presignedUrl ?? '';
  }
}