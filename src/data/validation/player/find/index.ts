export type playerQueryFields =
  | 'instagram'
  | 'isMemberBoolean'
  | 'isOnGuildBoolean'
  | 'name'
  | 'nickname';

export const playerListQueryFields: playerQueryFields[] = [
  'name',
  'nickname',
  'isMemberBoolean',
  'isOnGuildBoolean',
  'instagram'
];
