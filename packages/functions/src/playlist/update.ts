import { validateBody } from './../util/validate-body';
import { Resource } from "sst";
import { Util } from "@iptv/core/util";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { UpdateCommand, DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import { UpdatePlaylistSchea } from "../schemas/playlist-schema";
import { PlaylistRepository } from '../repositories/playlist.repository';
import { StorageService } from '../services/storage.service';
import { PlaylistService } from '../services/playlist.service';

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const playlistRepo = new PlaylistRepository();
const storageService = new StorageService();
const playlistService = new PlaylistService(playlistRepo, storageService);


export const main = Util.authHandler(async (event) => {
  const body = JSON.parse(event.body || "{}");
  const validatedBody = validateBody(UpdatePlaylistSchea, body);

  const userId = event.user.id;
  const playlistId = event?.pathParameters?.id || "";
  if (!playlistId || !userId) {
    throw new Error("Missing required parameters.");
  }

  await playlistService.update(userId, playlistId, validatedBody);

  return JSON.stringify({ status: true });
});
