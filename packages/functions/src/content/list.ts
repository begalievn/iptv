import { Resource } from "sst";
import { Util } from "@iptv/core/util";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QueryCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.authHandler(async (event, context) => {
  const params = {
    TableName: Resource.Content.name,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": event.user.id,
    },
  };

  const result = await dynamoDb.send(new QueryCommand(params));

  return JSON.stringify(result.Items);
});
