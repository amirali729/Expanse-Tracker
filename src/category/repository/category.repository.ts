import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { Category } from 'src/generated/prisma/client';
import { createCategoryData } from '../types/category.types';

@Injectable()
export class CategoryRespository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: createCategoryData): Promise<Category | null> {
    const category = await this.prisma.category.create({
      data: {
        userId: data.userId,
        name: data.name,
        description: data.description,
      },
    });
    return category;
  }

  async findCategoryByName(userId: number, name: string): Promise<Category | null> {
    const category = await this.prisma.category.findFirst({
      where: {
        userId,
        name,
      },
    });
    return category;
  }

  async getAllCategoryByUserId(userId: number): Promise<Category[]> {
    const categories = await this.prisma.category.findMany({
      where: {
        userId,
      },
    });

    return categories;
  }
}
