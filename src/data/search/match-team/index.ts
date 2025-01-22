import { playerTeamFindParams } from '../player-team';
import type { Prisma } from '@prisma/client';

export const matchTeamFindParams: Prisma.MatchTeamSelect = {
  id: true,
  playerTeam: { select: playerTeamFindParams },
  position: true
};
