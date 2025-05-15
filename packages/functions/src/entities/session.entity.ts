import { ISession } from "../interfaces/session.interface";

export class Session {
  id: string;
  userId: string;
  code: string;
  access_token: string;
  refresh_token?: string;
  createdAt: string;
  updatedAt: string;
  expiresAt: number;

  constructor(data: ISession) {
    this.id = data.id;
    this.userId = data.userId;
    this.code = data.code;
    this.access_token = data.access_token;
    this.refresh_token = data.refresh_token;
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
    this.expiresAt = data.expiresAt;
  }
}