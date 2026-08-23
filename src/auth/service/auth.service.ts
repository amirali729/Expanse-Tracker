import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { AuthRepsoitory } from '../repository/auth.repository';
import { CreatedUserInput, CreatedUserResponse } from '../types/auth.type';
import { toUserResponse } from '../mapper/auth.mapper';
import bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private readonly authRepo: AuthRepsoitory) {}
  async createUser(userData: CreatedUserInput): Promise<CreatedUserResponse> {
    userData.username.toLowerCase();
    userData.email.toLowerCase();
    const user = await this.authRepo.findUserByUsername(userData.username);
    if (user) {
      throw new ConflictException('username and email must be unique');
    }
    const hashedPassword = bcrypt.hashSync(userData.username, 10);
    userData.password = hashedPassword
    const createdUser = await this.authRepo.create(userData);
    if (!createdUser) {
      throw new InternalServerErrorException('cannot create user right now please try again');
    }
    return toUserResponse(createdUser);
  }
}
