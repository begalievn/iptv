import { Resource } from "sst";
import { Util } from "@iptv/core/util";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DeleteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.authHandler(async (event) => {
  const params = {
    TableName: Resource.Content.name,
    Key: {
      userId: event.user.id,
      id: event?.pathParameters?.id,
    },
  };

  await dynamoDb.send(new DeleteCommand(params));

  return JSON.stringify({ status: true });
}); 
