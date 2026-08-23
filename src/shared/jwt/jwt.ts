import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

type jwtData = {
  userId: string;
  username: string;
};

@Injectable()
export class jwtService {
  createAccessToken(data: jwtData) {
    const secret = process.env.ACCESS_SCERET_TOKEN;
    if (!secret) {
      throw new Error('secret are not configured');
    }
    return jwt.sign(data, secret as jwt.Secret, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY as jwt.SignOptions['expiresIn'],
    });
  }
  createRefreshToken(data: jwtData) {
    const secret = process.env.REFRESH_SCERET_TOKEN;
    if (!secret) {
      throw new Error('secret are not configured');
    }
    return jwt.sign(data, secret as jwt.Secret, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY as jwt.SignOptions['expiresIn'],
    });
  }

  verifyAccessToken(token: string) {
    const secret = process.env.ACCESS_SCERET_TOKEN as jwt.Secret;
    const payload = jwt.verify(token, secret);
    return payload;
  }

  verifyRefreshToken(token: string) {
    const secret = process.env.REFRESH_SCERET_TOKEN as jwt.Secret;
    const payload = jwt.verify(token, secret);
    return payload;
  }
}
