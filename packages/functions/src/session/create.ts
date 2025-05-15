import { Util } from "@iptv/core/util";
import { validateBody } from "../util/validate-body";
import { SessionService } from "../services/session.service";
import { CreateSessionSchema } from "../schemas/session-schema";
import { SessionRepository } from "../repositories/session.repository";

const sessionRepo = new SessionRepository();
const sessionService = new SessionService(sessionRepo);

export const main = Util.authHandler(async (event) => {
  const userId = event.user.id;
  const body = JSON.parse(event.body || "");
  const validatedBody = validateBody(CreateSessionSchema, body);

  const session = await sessionService.create(userId, validatedBody);

  return JSON.stringify(session);
});
