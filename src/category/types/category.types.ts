export type createCategoryData = {
  userId: number;
  name: string;
  description: string;
};

export type createCategoryResponse = {
  id: number;
  name: string;
  description: string | null;
  createdAt: Date;
};
