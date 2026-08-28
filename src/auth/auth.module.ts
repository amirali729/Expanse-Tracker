import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthRepsoitory } from './repository/auth.repository';
import { AuthController } from './controller/auth.controller';
import { JwtService } from 'src/shared/jwt/jwt';

@Module({
  providers: [AuthService, AuthRepsoitory, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
