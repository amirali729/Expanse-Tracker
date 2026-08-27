import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CategoryRespository } from '../repository/category.repository';
import { createCategoryData, createCategoryResponse } from '../types/category.types';
import { toCategoryResponse } from '../mapper/category.mapper';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRespository) {}

  async createCategory(categoryData: createCategoryData): Promise<createCategoryResponse> {
    const category = await this.categoryRepo.findCategoryByName(
      categoryData.userId,
      categoryData.name,
    );
    if (category) {
      throw new ConflictException('category already exists');
    }
    const createdCategory = await this.categoryRepo.create(categoryData);
    if (!createdCategory) {
      throw new InternalServerErrorException(
        'cannot created category rightnow please try again late',
      );
    }
    return toCategoryResponse(createdCategory);
  }

  async findAllCategory(userId: number) {
    const categories = await this.categoryRepo.getAllCategoryByUserId(userId);
    if (!categories) {
      throw new NotFoundException('no category found');
    }
    return categories.map(toCategoryResponse);
  }
}
