import { Module } from '@nestjs/common';
import { CategoryController } from './controller/category.controller';
import { CategoryService } from './service/category.service';
import { CategoryRespository } from './repository/category.repository';
import { AuthGuard } from 'src/shared/guard/auth';
import { JwtService } from 'src/shared/jwt/jwt';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRespository, JwtService, AuthGuard],
})
export class CategoryModule {}
