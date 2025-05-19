export interface ISession {
  id: string;
  userId: string;
  code: string;
  access_token: string;
  refresh_token?: string;
  createdAt: string;
  updatedAt: string;
  expiresAt: number;
}

export interface ICreateSession {
  code: string;
}

export interface ISessionResponse {
  access_token: string;
  refresh_token?: string;
}
