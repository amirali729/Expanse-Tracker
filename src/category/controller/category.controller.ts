import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { CategoryService } from '../service/category.service';
import { AuthGuard } from 'src/shared/guard/auth';
import type { Request } from 'express';
import { CreateCategoryDto } from '../dto/category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryservice: CategoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async createCategory(@Body() dto: CreateCategoryDto, @Req() request: Request) {
    const categoryDtoData = {
      ...dto,
      userId: request.user.userId,
    };
    const category = await this.categoryservice.createCategory(categoryDtoData);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Category created successfully',
      data: category,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getAllCategory(@Req() request: Request) {
    const categories = await this.categoryservice.findAllCategory(request.user.userId);

    return {
      statusCode: HttpStatus.OK,
      message: 'Category retrived successfully',
      data: categories,
    };
  }
}
