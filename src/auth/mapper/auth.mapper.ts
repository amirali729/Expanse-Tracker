import { User } from 'src/generated/prisma/client';

export function toUserResponse(user: User) {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
