export class Playlist {
  userId: string;
  id: string;
  title: string;
  description?: string;
  mac_address?: string;
  filename?: string;
  fileKey?: string;
  playlistUrl?: string;
  createdAt: string;
  updatedAt: string;
  presignedUrl?: string;

  constructor(data: Partial<Playlist>) {
    if (!data.userId || !data.id || !data.title) {
      throw new Error("Missing required playlist properties");
    }

    this.userId = data.userId;
    this.id = data.id;
    this.title = data.title;
    this.description = data.description || "";
    this.mac_address = data.mac_address || "";
    this.filename = data.filename || "";
    this.fileKey = data.fileKey || "";
    this.playlistUrl = data.playlistUrl || "";
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
    this.presignedUrl = data.presignedUrl;
  }
}
