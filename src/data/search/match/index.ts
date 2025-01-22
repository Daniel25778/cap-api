import { matchTeamFindParams } from '../match-team';
import type { Prisma } from '@prisma/client';

export const matchFindParams: Prisma.MatchSelect = {
  createdAt: true,
  description: true,
  id: true,
  matchTeam: { orderBy: { position: 'asc' }, select: matchTeamFindParams },
  name: true,
  type: true,
  updatedAt: true
};

export const matchFindParamsSimple: Prisma.MatchSelect = {
  createdAt: true,
  description: true,
  id: true,
  name: true,
  type: true,
  updatedAt: true
};
