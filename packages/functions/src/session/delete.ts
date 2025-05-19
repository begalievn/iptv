import { Util } from "@iptv/core/util";
import { SessionRepository } from "../repositories/session.repository";
import { SessionService } from "../services/session.service";

const sessionRepo = new SessionRepository();
const sessionService = new SessionService(sessionRepo);

export const main = Util.authHandler(async (event) => {
  const userId = event.user.id;
  const { id } = event?.pathParameters || {};

  if (!id || !userId) {
    throw new Error('Missing required parameters.');
  }

  await sessionService.delete(userId, id);

  return JSON.stringify({ status: true });
});
