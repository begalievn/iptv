import { Util } from "@iptv/core/util";
import { ICreateSession } from "../interfaces/session.interface";
import * as uuid from "uuid";
import { Session } from "../entities/session.entity";
import { ISessionRepository } from "../interfaces/session-repository.interface";

export class SessionService {
  constructor(private readonly sessionRepo: ISessionRepository) {}

  async create(userId: string, data: ICreateSession) {
    const sessionWithSameCode = await this.getByCode(userId, data.code);
    if (sessionWithSameCode) {
      await this.delete(userId, sessionWithSameCode.id);
    }

    const token = await Util.createCustomToken(userId);
    const nowInSeconds = Math.floor(Date.now() / 1000);
    const expiresAt = nowInSeconds + 60 * 60 * 3; // 3 hours

    const newSession = new Session({
      id: uuid.v4(),
      userId,
      code: data.code,
      access_token: token,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      expiresAt,
    });

    return await this.sessionRepo.create(newSession);
  }

  async list() {
    return await this.sessionRepo.list();
  }

  async listByUser(userId: string): Promise<Session[]> {
    return await this.sessionRepo.listByUser(userId);
  }

  async getById(userId: string, sessionId: string): Promise<Session | null> {
    return await this.sessionRepo.getById(userId, sessionId);
  }

  async getByCode(userId: string, code: string) {
    return await this.sessionRepo.getByCode(userId, code);
  }

  async delete(userId: string, sessionId: string) {
    const session = await this.getById(userId, sessionId);
    if (!session) throw new Error("Session not found");

    await this.sessionRepo.delete(userId, sessionId);
  }
}
