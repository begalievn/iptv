import { Util } from "@iptv/core/util";
import { SessionRepository } from "../repositories/session.repository";
import { SessionService } from "../services/session.service";
import { ISessionResponse } from "../interfaces/session.interface";

const sessionRepo = new SessionRepository();
const sessionService = new SessionService(sessionRepo);

export const main = Util.handler(async (event) => {
  const { code } = event?.pathParameters || {};

  if (!code) {
    throw new Error("Missing required parameters.");
  }

  const session = await sessionService.getByCode(code);

  if (!session) {
    throw new Error("Session not found");
  }

  const sessionResponse: ISessionResponse = {
    access_token: session.access_token,
  }

  return JSON.stringify(sessionResponse);
});
