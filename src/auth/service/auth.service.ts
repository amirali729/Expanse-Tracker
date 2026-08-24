import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
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
import { jwtService } from 'src/shared/jwt/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly authRepo: AuthRepsoitory,
    private readonly jwt: jwtService,
  ) {}
  async createUser(userData: CreatedUserInput): Promise<CreatedUserResponse> {
    userData.username.toLowerCase();
    userData.email.toLowerCase();
    const user = await this.authRepo.findUserByUsername(userData.username);
    if (user) {
      throw new ConflictException('username and email must be unique');
    }
    const hashedPassword = bcrypt.hashSync(userData.username, 10);
    userData.password = hashedPassword;
    const createdUser = await this.authRepo.create(userData);
    if (!createdUser) {
      throw new InternalServerErrorException('cannot create user right now please try again');
    }
    return toUserResponse(createdUser);
  }

  async loginUser(userData: loginUserInput): Promise<loginUserResponse> {
    userData.username.toLowerCase();
    const user = await this.authRepo.findUserByUsername(userData.username);
    if (!user) {
      throw new BadRequestException('please give valid username or create account');
    }
    const verifyPassword = await bcrypt.compare(userData.password, user.password);
    if (!verifyPassword) {
      throw new BadRequestException('incorrect Password');
    }
    const jwtUserData = {
      userId: user.id,
      username: user.username,
    };
    const accessToken = this.jwt.createAccessToken(jwtUserData);
    const refreshToken = this.jwt.createRefreshToken(jwtUserData);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    await this.authRepo.createSession({
      userId: user.id,
      tokenHash: hashedRefreshToken,
      expiresAt,
    });

    return {
      username: user.username,
      email: user.email,
      accessToken,
    };
  }
}
