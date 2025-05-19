import { Util } from "@iptv/core/util";
import { SessionRepository } from "../repositories/session.repository";
import { SessionService } from "../services/session.service";
import { ISessionResponse } from "../interfaces/session.interface";

const sessionRepo = new SessionRepository();
const sessionService = new SessionService(sessionRepo);

export const main = Util.authHandler(async (event) => {
  const { code } = event?.pathParameters || {};
  const userId = event.user.id;

  if (!code || !userId) {
    throw new Error("Missing required parameters.");
  }

  const session = await sessionService.getByCode(userId, code);

  if (!session) {
    throw new Error("Session not found");
  }

  const sessionResponse: ISessionResponse = {
    access_token: session.access_token,
  }

  return JSON.stringify(sessionResponse);
});
