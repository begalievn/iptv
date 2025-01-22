import { IStorageService } from "../interfaces/storage-service.interface";

export class UploadService {
  constructor(private storageService: IStorageService) {}

  async getUploadUrl(userId: string, originalFilename: string): Promise<{ uploadUrl: string; fileKey: string }> {
    const fileKey = this.generateFileKey(userId, originalFilename);
    const uploadUrl = await this.storageService.getPresignedUploadUrl(fileKey);
    return { uploadUrl, fileKey };
  }

  private generateFileKey(userId: string, originalFilename: string): string {
    const fileExtension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);
    const fileBaseName = originalFilename.substring(0, originalFilename.lastIndexOf("."));
    return `${userId}/${fileBaseName}-${Date.now()}.${fileExtension}`;
  }
}
