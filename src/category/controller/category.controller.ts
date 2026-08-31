import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from '../service/category.service';
import { AuthGuard } from 'src/shared/guard/auth';
import type { Request } from 'express';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';

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

  @Delete(':categoryId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async delete(@Req() request: Request, @Param('categoryId') id: string) {
    const userId = request.user.userId;
    const categoryId = Number(id);
    const category = await this.categoryservice.deleteCategory(userId, categoryId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Caegory deleted successfully',
      data: category,
    };
  }

  @Patch(':categoryId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async update(
    @Param('categoryId') id: string,
    @Req() request: Request,
    @Body() dto: UpdateCategoryDto,
  ) {
    const userId = request.user.userId;
    const categoryId = Number(id);
    const category = await this.categoryservice.updateCategory(categoryId, userId, dto);

    return {
      statusCode: HttpStatus.OK,
      message: 'Category updated successfully',
      data: category,
    };
  }
}
