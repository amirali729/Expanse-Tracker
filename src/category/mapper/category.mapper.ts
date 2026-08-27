import { Category } from 'src/generated/prisma/client';

export function toCategoryResponse(category: Category) {
  return {
    id: category.id,
    name: category.name,
    description: category.description,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
  };
}
