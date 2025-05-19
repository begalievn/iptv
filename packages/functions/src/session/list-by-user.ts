import { Util } from "@iptv/core/util";
import { SessionRepository } from "../repositories/session.repository";
import { SessionService } from "../services/session.service";

const sessionRepo = new SessionRepository();
const sessionService = new SessionService(sessionRepo);

export const main = Util.authHandler(async (event) => {
  const userId = event.user.id;

  const sessions = await sessionService.listByUser(userId);

  return JSON.stringify(sessions);
});
