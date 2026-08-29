import 'express';

declare module 'express' {
  interface Request {
    user: {
      userId: number;
      username: string;
    };
    refresh_token: {
      userId: number;
      sessionId: string;
    };
  }
}
