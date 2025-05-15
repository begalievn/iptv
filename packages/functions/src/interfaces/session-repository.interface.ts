import { Session } from "../entities/session.entity";

export interface ISessionRepository {
  create(session: Session): Promise<Session>;
  list(): any;
  listByUser(userId: string): Promise<Session[]>;
  getByCode(userId: string, code: string): Promise<Session | null>;
  getById(userId: string, sessionId: string): Promise<Session | null>;
  delete(userId: string, sessionId: string): Promise<void>;
}
