export interface IPlaylist {
  id: string;
  title: string;
  description: string;
  mac_address: string;
  fileKey: string;
  filename: string;
  createdAt: string;
  updatedAt: string;
  presignedUrl?: string;
  playlistUrl?: string;
}

export interface ICreatePlaylist {
  title: string;
  description: string;
  mac_address: string;
  filename?: string;
  fileKey?: string;
  playlistUrl?: string;
}

export interface IUpdatePlaylist {
  title: string;
  description: string;
  mac_address: string;
  filename?: string;
  fileKey?: string;
  playlistUrl?: string;
}
