import { validateBody } from './../util/validate-body';
import { Resource } from "sst";
import { Util } from "@iptv/core/util";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { UpdateCommand, DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import { UpdatePlaylistSchea } from "../schemas/playlist-schema";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.authHandler(async (event) => {
  const body = JSON.parse(event.body || "{}");
  const validatedBody = validateBody(UpdatePlaylistSchea, body);
  const itemKeys = Object.keys(validatedBody).filter((k) => k !== "id");
  const userId = event.user.id;
  const playlistId = event?.pathParameters?.id || '';

  const playlist = await fetchPlaylistItem(userId, playlistId);

  console.log('playlist', playlist);

  const params = {
    TableName: Resource.Playlists.name,
    Key: {
      userId: userId,
      id: playlistId,
    },
    UpdateExpression: `SET ${itemKeys
      .map((k, index) => `#field${index} = :value${index}`)
      .join(", ")}`,
    ExpressionAttributeNames: itemKeys.reduce(
      (accumulator, k, index) => ({
        ...accumulator,
        [`#field${index}`]: k,
      }),
      {}
    ),
    ExpressionAttributeValues: itemKeys.reduce(
      (accumulator, k, index) => ({
        ...accumulator,
        [`:value${index}`]: validatedBody[k as keyof typeof validatedBody],
      }),
      {}
    ),
  };

  await dynamoDb.send(new UpdateCommand(params));

  return JSON.stringify({ status: true });
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
