import type { Prisma } from '@prisma/client';

export const playerFindParams: Prisma.PlayerSelect = {
  createdAt: true,
  id: true,
  instagram: true,
  isMember: true,
  isOnGuild: true,
  name: true,
  nickname: true,
  totalKills: true,
  updatedAt: true
};
