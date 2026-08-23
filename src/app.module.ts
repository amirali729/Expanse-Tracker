import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/controller/auth.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './db/prisma.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
