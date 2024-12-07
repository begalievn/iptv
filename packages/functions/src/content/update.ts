import { Resource } from "sst";
import { Util } from "@iptv/core/util";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { UpdateCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event) => {
  const data = JSON.parse(event.body || "{}");

  const params = {
    TableName: Resource.Content.name,
    Key: {
      // The attributes of the item to be created
      userId: event.requestContext.authorizer?.iam.cognitoIdentity.identityId, // The id of the author
      id: event?.pathParameters?.id, // The id of the note from the path
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET title = :title, description = :description",
    ExpressionAttributeValues: {
      ":title": data.title || null,
      ":description": data.description || null,
    },
  };

  await dynamoDb.send(new UpdateCommand(params));

  return JSON.stringify({ status: true });
});