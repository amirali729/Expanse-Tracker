export interface CreatedUserInput {
  username: string;
  email: string;
  password: string;
}
export type CreatedUserResponse = {
  id: number;
  username: string;
  email: string;
  createdAt: Date;
};
export interface loginUserInput {
  username: string;
  password: string;
}

export interface loginUserResponse {
  username: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatedUserSessionInput {
  userId: number;
  tokenHash: string;
  expiresAt: Date;
}
