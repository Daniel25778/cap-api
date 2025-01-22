import { MatchType } from '@prisma/client';
import { enumTypeNotRequired, stringNotRequired } from '@main/utils';
import { yup } from '@infra/yup';

export const updateMatchSchema = yup.object().shape({
  body: yup.object().shape({
    description: stringNotRequired(),
    name: stringNotRequired(),
    type: enumTypeNotRequired({
      data: MatchType,
      english: 'type',
      portuguese: 'tipo'
    })
  })
});
