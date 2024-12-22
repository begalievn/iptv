export interface IPlaylist {
  id: string;
  title: string;
  description: string;
  fileKey: string;
  filename: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreatePlaylist {
  title: string;
  description: string;
  filename: string;
  fileKey: string;
}
