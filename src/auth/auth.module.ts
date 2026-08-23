import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';

@Module({
  imports: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
