export interface IStorageService {
  deleteFile(fileKey: string): Promise<void>;
  getSignedUrl(fileKey: string): Promise<string>;
  getPresignedUploadUrl(fileKey: string): Promise<string>;
}
