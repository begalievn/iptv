import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand, PutCommand, QueryCommand, UpdateCommand, DeleteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { IPlaylistRepository } from "../interfaces/playlist-repository.interface";
import { Playlist } from "../entities/playlist.entity";
import { Resource } from "sst";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export class PlaylistRepository implements IPlaylistRepository {
  private tableName = Resource.Playlists.name;

  async create(playlist: Playlist): Promise<Playlist> {
    const params = {
      TableName: this.tableName,
      Item: { ...playlist },
    };

    await dynamoDb.send(new PutCommand(params));
    return new Playlist(playlist);
  }

  async getById(userId: string, playlistId: string): Promise<Playlist | null> {
    const params = {
      TableName: this.tableName,
      Key: { userId, id: playlistId },
    };

    const { Item } = await dynamoDb.send(new GetCommand(params));
    return Item ? new Playlist(Item) : null;
  }

  async listByUser(userId: string): Promise<Playlist[]> {

    const params = {
      TableName: this.tableName,
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: { ":userId": userId },
      ScanIndexForward: false,
    };

    const result = await dynamoDb.send(new QueryCommand(params));

    console.log('result', result);
    return (result.Items as Playlist[] || []).map(item => new Playlist(item));
  }

  async update(userId: string, playlistId: string, updates: Partial<Playlist>): Promise<void> {
    const updateKeys = Object.keys(updates);

    const params = {
      TableName: this.tableName,
      Key: { userId, id: playlistId },
      UpdateExpression: `SET ${updateKeys.map((k, i) => `#k${i} = :v${i}`).join(", ")}`,
      ExpressionAttributeNames: updateKeys.reduce((acc, k, i) => ({ ...acc, [`#k${i}`]: k }), {}),
      ExpressionAttributeValues: updateKeys.reduce((acc, k, i) => ({ ...acc, [`:v${i}`]: updates[k as keyof Playlist] }), {}),
    };

    await dynamoDb.send(new UpdateCommand(params));
  }

  async delete(userId: string, playlistId: string): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: { userId, id: playlistId },
    };

    await dynamoDb.send(new DeleteCommand(params));
  }
}
