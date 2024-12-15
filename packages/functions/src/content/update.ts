import { Resource } from "sst";
import { Util } from "@iptv/core/util";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { UpdateCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.authHandler(async (event) => {
  const data = JSON.parse(event.body || "{}");

  const params = {
    TableName: Resource.Content.name,
    Key: {
      userId: event.user.id,
      id: event?.pathParameters?.id,
    },
    UpdateExpression: "SET title = :title, description = :description",
    ExpressionAttributeValues: {
      ":title": data.title || null,
      ":description": data.description || null,
    },
  };

  await dynamoDb.send(new UpdateCommand(params));

  return JSON.stringify({ status: true });
});