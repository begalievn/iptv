import { Resource } from "sst";
import { Util } from "@iptv/core/util";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const s3Client = new S3Client({});

export const main = Util.authHandler(async (event) => {
  const { id } = event?.pathParameters || {};
  const { user } = event;

  if (!id || !user?.id) {
    throw new Error("Missing required parameters.");
  }

  const item = await fetchPlaylistItem(user.id, id);

  if (!item) {
    throw new Error("Item not found.");
  }

  const presignedUrl = item.fileKey
    ? await generatePresignedUrl(item.fileKey)
    : '';

  return JSON.stringify({ ...item, presignedUrl });
});

async function fetchPlaylistItem(userId: string, playlistId: string) {
  const params = {
    TableName: Resource.Playlists.name,
    Key: {
      userId,
      id: playlistId,
    },
  };

  const { Item } = await dynamoDb.send(new GetCommand(params));
  return Item;
}

async function generatePresignedUrl(fileKey: string) {
  return getSignedUrl(
    s3Client,
    new GetObjectCommand({
      Bucket: Resource.Uploads.name,
      Key: fileKey,
    }),
    { expiresIn: 3000 }
  );
}
