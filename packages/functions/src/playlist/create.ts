import * as uuid from "uuid";
import { Resource } from "sst";
import { Util } from "@iptv/core/util";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

import { validateBody } from "../util/validate-body";
import { CreatePlaylistSchema } from "../schemas/playlist-schema";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.authHandler(async (event) => {
  const body = JSON.parse(event.body || '');
  const validatedBody = validateBody(CreatePlaylistSchema, body);

  const params = {
    TableName: Resource.Content.name,
    Item: {
      userId: event.user.id,
      id: uuid.v1(),
      title: validatedBody.title,
      description: validatedBody.description,
      filename: validatedBody.filename,
      fileKey: validatedBody.fileKey,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };

  await dynamoDb.send(new PutCommand(params));

  return JSON.stringify(params.Item);
});
