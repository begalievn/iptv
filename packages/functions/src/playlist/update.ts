import { validateBody } from './../util/validate-body';
import { Resource } from "sst";
import { Util } from "@iptv/core/util";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { UpdateCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { UpdatePlaylistSchea } from "../schemas/playlist-schema";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.authHandler(async (event) => {
  const body = JSON.parse(event.body || "{}");
  const validatedBody = validateBody(UpdatePlaylistSchea, body);
  const itemKeys = Object.keys(validatedBody).filter((k) => k !== "id");

  const params = {
    TableName: Resource.Playlists.name,
    Key: {
      userId: event.user.id,
      id: event?.pathParameters?.id,
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
