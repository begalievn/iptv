import { Resource } from "sst";
import { ISessionRepository } from "../interfaces/session-repository.interface";
import { Session } from "../entities/session.entity";
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { ISession } from "../interfaces/session.interface";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export class SessionRepository implements ISessionRepository {
  private tableName = Resource.Session.name;

  async create(session: Session): Promise<Session> {
    const params = {
      TableName: this.tableName,
      Item: { ...session },
    };

    const result = await dynamoDb.send(new PutCommand(params));
    console.log("result", result);

    return session;
  }

  async list() {
    const params = {
      TableName: this.tableName,
      ScanIndexForward: false,
    };

    const result = await dynamoDb.send(new QueryCommand(params));

    return result.Items;
  }

  async listByUser(userId: string): Promise<Session[]> {
    const params = {
      TableName: this.tableName,
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: { ":userId": userId },
      ScanIndexForward: false,
    };

    const result = await dynamoDb.send(new QueryCommand(params));

    return ((result.Items as ISession[]) || []).map(
      (item) => new Session(item)
    );
  }

  async getById(userId: string, sessionId: string): Promise<Session | null> {
    const params = {
      TableName: this.tableName,
      Key: { userId, id: sessionId },
    };

    const { Item } = await dynamoDb.send(new GetCommand(params));
    return Item ? new Session(Item as ISession) : null;
  }

  async getByCode(code: string): Promise<Session | null> {
    const params = {
      TableName: this.tableName,
      IndexName: "codeIndex",
      KeyConditionExpression: "code = :code",
      ExpressionAttributeValues: {
        ":code": code,
      },
    };

    const { Items } = await dynamoDb.send(new QueryCommand(params));

    if (!Items || Items.length === 0) return null;

    return new Session(Items[0] as ISession);
  }

  async delete(userId: string, playlistId: string): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: { userId, id: playlistId },
    };

    await dynamoDb.send(new DeleteCommand(params));
  }
}
