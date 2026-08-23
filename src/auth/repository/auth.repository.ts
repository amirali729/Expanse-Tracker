import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { User } from 'src/generated/prisma/client';
import { CreatedUserInput } from '../types/auth.type';

@Injectable()
export class AuthRepsoitory {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByUsername(username: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    return user;
  }

  async create(userData: CreatedUserInput): Promise<User | null> {
    const { username, email, password } = userData;
    const user = await this.prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
    return user;
  }
}
