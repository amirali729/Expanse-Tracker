import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepsoitory } from '../repository/auth.repository';
import {
  CreatedUserInput,
  CreatedUserResponse,
  loginUserInput,
  loginUserResponse,
} from '../types/auth.type';
import { toUserResponse } from '../mapper/auth.mapper';
import bcrypt from 'bcrypt';
import { JwtService } from 'src/shared/jwt/jwt';
import { randomUUID } from 'node:crypto';
import { resetPasswordDto } from '../dto/auth.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly authRepo: AuthRepsoitory,
    private readonly jwt: JwtService,
  ) {}
  async createUser(userData: CreatedUserInput): Promise<CreatedUserResponse> {
    const user = await this.authRepo.findUserByUsername(userData.username);
    if (user) {
      throw new ConflictException({
        code: 'USERNAME_ALREADY_EXISTS',
        message: 'An account with this username already exists',
      });
    }
    const hashedPassword = bcrypt.hashSync(userData.password, 10);
    userData.password = hashedPassword;
    const createdUser = await this.authRepo.create(userData);
    if (!createdUser) {
      throw new InternalServerErrorException({
        code: 'USER_CREATION_FAILED',
        message: 'user could not be created rightnow please try again later',
      });
    }
    return toUserResponse(createdUser);
  }

  async loginUser(userData: loginUserInput): Promise<loginUserResponse> {
    const user = await this.authRepo.findUserByUsername(userData.username);
    if (!user) {
      throw new BadRequestException({
        code: 'INVALID_CREDENTIAL',
        message: 'no user exist with this username please provide correct username',
      });
    }
    const verifyPassword = await bcrypt.compare(userData.password, user.password);
    if (!verifyPassword) {
      throw new BadRequestException({
        code: 'INVALID_CREDENTIAL',
        message: 'incorrect password try again',
      });
    }
    const sessionId = randomUUID();
    const jwtUserData = {
      userId: user.id,
      username: user.username,
    };
    const accessToken = this.jwt.createAccessToken(jwtUserData);
    const refreshToken = this.jwt.createRefreshToken({
      userId: user.id,
      sessionId,
    });
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    await this.authRepo.createSession({
      userId: user.id,
      sessionId,
      tokenHash: hashedRefreshToken,
      expiresAt,
    });

    return {
      username: user.username,
      email: user.email,
      accessToken,
      refreshToken,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async logoutUser(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException({
        code: 'REFRESH_TOKEN_MISSING',
        message: 'Refresh token is missing',
      });
    }

    const payload = this.jwt.verifyRefreshToken(refreshToken);

    const session = await this.authRepo.findSessionById(payload.sessionId);

    if (!session) {
      throw new UnauthorizedException({
        code: 'INVALID_REFRESH_SESSION',
        message: 'Invalid authentication session',
      });
    }

    const isValidToken = await bcrypt.compare(refreshToken, session.tokenHash);

    if (!isValidToken) {
      throw new UnauthorizedException({
        code: 'INVALID_REFRESH_TOKEN',
        message: 'Invalid authentication session',
      });
    }

    if (session.expiresAt <= new Date()) {
      return;
    }

    if (session.revokedAt) {
      return;
    }

    await this.authRepo.revokedSession(session.id, session.userId);
    return;
  }

  async resetPassword(userId: number, passswordData: resetPasswordDto) {
    if (passswordData.oldPassword === passswordData.newPassword) {
      throw new BadRequestException({
        code: 'INVALID_CREDENTIAL',
        message: 'new password cannot be same as old password',
      });
    }
    const user = await this.authRepo.findUserById(userId);
    if (!user) {
      throw new UnauthorizedException({
        code: 'Unauthorized',
        message: 'login first',
      });
    }
    const verifyPassword = await bcrypt.compare(passswordData.oldPassword, user.password);
    if (!verifyPassword) {
      throw new BadRequestException({
        code: 'INVALID_CREDENTIAL',
        message: 'incorrect password try again',
      });
    }
    const newHashedPassword = await bcrypt.hash(passswordData.newPassword, 10);
    await this.authRepo.updateUserPassword(user.id, newHashedPassword);
    return;
  }

  async getUserProfile(userId: number) {
    const user = await this.authRepo.findUserById(userId);
    if (!user) {
      throw new UnauthorizedException({
        code: 'Unauthorized',
        message: 'login first',
      });
    }

    return toUserResponse(user);
  }
}
