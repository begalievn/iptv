import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Util } from "@iptv/core/util"
import { Resource } from "sst";

const s3Client = new S3Client({});

export const main = Util.authHandler(async (event) => {
  let filename = `${Date.now()}`;
  const bucketName = Resource.Uploads.name;
  const userId = event.user.id;

  if (!bucketName) {
    throw new Error('Missing S3 bucketn env');
  }

  if (event.body != null) {
    const body = JSON.parse(event.body);

    if (!body.filename) {
      throw new Error('Missing filename in request body');
    }

    const originalFilename = body.filename;

    const fileExtension = originalFilename.substring(originalFilename.lastIndexOf('.') + 1);
    const fileBaseName = originalFilename.substring(0, originalFilename.lastIndexOf('.'));

    filename = `${fileBaseName}-${Date.now()}.${fileExtension}`;
  }

  if (!filename) {
    throw new Error('Missing fileName value');
  }

  const uploadUrl = await getSignedUrl(
    s3Client,
    new PutObjectCommand({
      Bucket: bucketName,
      Key: `${userId}/${filename}`,
    }),
    { 
      expiresIn: 300
    }
  )

  return JSON.stringify({ uploadUrl, fileKey: `${userId}/${filename}` });
})