import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './db/prisma.module';
import { AccountController } from './account/controller/account.controller';
import { AccountModule } from './account/account.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    PrismaModule,
    AccountModule,
  ],
  controllers: [AccountController],
  providers: [],
})
export class AppModule {}
