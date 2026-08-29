import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export type AccessTokenPayload = {
  userId: number;
  username: string;
};
export type RefreshTokenPayload = {
  userId: number;
  sessionId: string;
};

@Injectable()
export class JwtService {
  createAccessToken(data: AccessTokenPayload) {
    const secret = process.env.ACCESS_SCERET_TOKEN;

    if (!secret) {
      throw new Error('Access token secret is not configured');
    }

    return jwt.sign(data, secret, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY as jwt.SignOptions['expiresIn'],
    });
  }

  createRefreshToken(data: RefreshTokenPayload) {
    const secret = process.env.REFRESH_SCERET_TOKEN;

    if (!secret) {
      throw new Error('Refresh token secret is not configured');
    }

    return jwt.sign(data, secret, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY as jwt.SignOptions['expiresIn'],
    });
  }

  verifyAccessToken(token: string): AccessTokenPayload {
    const secret = process.env.ACCESS_SCERET_TOKEN;

    if (!secret) {
      throw new Error('Access token secret is not configured');
    }

    const payload = jwt.verify(token, secret);

    if (typeof payload === 'string') {
      throw new Error('Invalid access token payload');
    }

    return payload as AccessTokenPayload;
  }

  verifyRefreshToken(token: string): RefreshTokenPayload {
    const secret = process.env.REFRESH_SCERET_TOKEN;

    if (!secret) {
      throw new Error('Refresh token secret is not configured');
    }

    const payload = jwt.verify(token, secret);

    if (typeof payload === 'string') {
      throw new Error('Invalid refresh token payload');
    }

    return payload as RefreshTokenPayload;
  }
}
