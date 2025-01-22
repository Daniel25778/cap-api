export type playerQueryFields =
  | 'instagram'
  | 'isMemberBoolean'
  | 'isOnGuildBoolean'
  | 'name'
  | 'nickname'
  | 'totalKillsLessThan'
  | 'totalKillsMoreThan';

export const playerListQueryFields: playerQueryFields[] = [
  'name',
  'nickname',
  'isMemberBoolean',
  'totalKillsMoreThan',
  'totalKillsLessThan',
  'isOnGuildBoolean',
  'instagram'
];
