import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CategoryRespository } from '../repository/category.repository';
import { createCategoryData, createCategoryResponse } from '../types/category.types';
import { toCategoryResponse } from '../mapper/category.mapper';
import { UpdateCategoryDto } from '../dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRespository) {}

  async createCategory(categoryData: createCategoryData): Promise<createCategoryResponse> {
    const category = await this.categoryRepo.findCategoryByName(
      categoryData.userId,
      categoryData.name,
    );
    if (category) {
      throw new ConflictException({
        code: 'CATEGORY_ALREADY_EXISTS',
        message: 'An category with this name already exists',
      });
    }
    const createdCategory = await this.categoryRepo.create(categoryData);
    if (!createdCategory) {
      throw new InternalServerErrorException({
        code: 'CATEGORY_CREATION_FAILED',
        message: 'category could not be created right now please try again later',
      });
    }
    return toCategoryResponse(createdCategory);
  }

  async findAllCategory(userId: number) {
    const categories = await this.categoryRepo.getAllCategoryByUserId(userId);
    if (!categories) {
      throw new NotFoundException({
        code: 'CATEGORY_NOT_FOUND',
        message: 'category with this name not exists',
      });
    }
    return categories.map(toCategoryResponse);
  }

  async deleteCategory(userId: number, categoyrId: number) {
    const category = await this.categoryRepo.findCategoryById(userId, categoyrId);

    if (!category) {
      throw new NotFoundException({
        code: 'CATEGORY_NOT_FOUND',
        message: 'category with this name not exists',
      });
    }

    const deletedCategory = await this.categoryRepo.delete(category.id);
    return toCategoryResponse(deletedCategory);
  }

  async updateCategory(categoryId: number, userId: number, dto: UpdateCategoryDto) {
    const category = await this.categoryRepo.findCategoryById(userId, categoryId);

    if (!category) {
      throw new NotFoundException({
        code: 'CATEGORY_NOT_FOUND',
        message: 'no category is found',
      });
    }

    const updateCategory = await this.categoryRepo.update(userId, categoryId, dto);

    return toCategoryResponse(updateCategory);
  }
}
