export interface IStorageService {
  uploadFile(fileKey: string, file: Buffer): Promise<void>;
  deleteFile(fileKey: string): Promise<void>;
  getSignedUrl(fileKey: string): Promise<string>;
}
