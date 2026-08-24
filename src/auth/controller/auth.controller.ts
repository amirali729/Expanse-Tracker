import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { CreateUserDto, loginUserDto } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() dto: CreateUserDto) {
    const user = await this.authservice.createUser(dto);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'User created successfully',
      data: user,
    };
  }

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  async loginUser(@Body() dto: loginUserDto, @Res({ passthrough: true }) response: Response) {
    const user = await this.authservice.loginUser(dto);
    response.cookie('refresh_token', result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return {
      statusCode: HttpStatus.CREATED,
      message: 'User created successfully',
      data: user,
    };
  }
}
