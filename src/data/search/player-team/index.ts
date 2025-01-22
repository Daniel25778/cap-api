import { playerFindParams } from '../player';
import type { Prisma } from '@prisma/client';

export const playerTeamFindParams: Prisma.PlayerTeamSelect = {
  id: true,
  kill: true,
  player: { select: playerFindParams }
};
