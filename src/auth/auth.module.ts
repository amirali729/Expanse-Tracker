import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthRepsoitory } from './repository/auth.repository';
import { AuthController } from './controller/auth.controller';
import { jwtService } from 'src/shared/jwt/jwt';

@Module({
  providers: [AuthService, AuthRepsoitory, jwtService],
  controllers: [AuthController],
})
export class AuthModule {}
