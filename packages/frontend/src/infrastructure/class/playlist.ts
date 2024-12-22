import { IPlaylist } from "../../../../core/src/interfaces";

export class Playlist {
  id: string;
  title: string;
  description: string;
  fileKey: string;
  filename: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: IPlaylist) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.fileKey = data.fileKey;
    this.filename = data.filename;
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);
  }
}