import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { CreateUserDto, loginUserDto } from '../dto/auth.dto';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() dto: CreateUserDto) {
    const user = await this.authservice.createUser(dto);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'User created successfully',
      data: user,
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async loginUser(@Body() dto: loginUserDto, @Res({ passthrough: true }) response: Response) {
    const user = await this.authservice.loginUser(dto);
    response.cookie('refresh_token', user.refreshToken, {
      httpOnly: true,
      secure: false, // it is used for https but we doing in local environment
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'User created successfully',
      data: {
        username: user.username,
        email: user.email,
        accessToken: user.accessToken,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }
}
