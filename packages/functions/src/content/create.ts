import * as uuid from "uuid";
import { Resource } from "sst";
import { Util } from "@iptv/core/util";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event) => {
  let data = {
    title: "",
    description: "",
  };

  if (event.body != null) {
    data = JSON.parse(event.body);
  }

  const params = {
    TableName: Resource.Content.name,
    Item: {
      userId: event.requestContext.authorizer?.iam.cognitoIdentity.identityId,
      id: uuid.v1(),
      title: data.title, // Parsed from request body
      description: data.description,
      createdAt: Date.now(), // Current Unix timestamp
    },
  };

  await dynamoDb.send(new PutCommand(params));

  return JSON.stringify(params.Item);
});
