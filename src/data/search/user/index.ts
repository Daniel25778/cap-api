import type { Prisma } from '@prisma/client';

export const userFindParams: Prisma.UserSelect = {
  createdAt: true,
  email: true,
  id: true,
  updatedAt: true
};
