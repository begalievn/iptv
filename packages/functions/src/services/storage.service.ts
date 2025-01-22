import { S3Client, DeleteObjectCommand, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { IStorageService } from "../interfaces/storage-service.interface";
import { Resource } from "sst";

const s3Client = new S3Client({});

export class StorageService implements IStorageService {
  private bucketName = Resource.Uploads.name;

  async deleteFile(fileKey: string): Promise<void> {
    const params = { Bucket: Resource.Uploads.name, Key: fileKey };
    await s3Client.send(new DeleteObjectCommand(params));
  }

  async getSignedUrl(fileKey: string): Promise<string> {
    return getSignedUrl(s3Client, new GetObjectCommand({ Bucket: Resource.Uploads.name, Key: fileKey }), { expiresIn: 3000 });
  }

  async getPresignedUploadUrl(fileKey: string): Promise<string> {
    return getSignedUrl(
      s3Client,
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileKey,
      }),
      { expiresIn: 300 }
    );
  }
}
