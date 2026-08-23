import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthRepsoitory } from './repository/auth.repository';
import { AuthController } from './controller/auth.controller';

@Module({
  providers: [AuthService, AuthRepsoitory],
  controllers: [AuthController],
})
export class AuthModule {}
