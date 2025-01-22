import { MatchType } from '@prisma/client';
import { enumTypeRequired, stringNotRequired, stringRequired } from '@main/utils';
import { yup } from '@infra/yup';

export const insertMatchSchema = yup.object().shape({
  body: yup.object().shape({
    description: stringNotRequired(),
    name: stringRequired({
      english: 'name',
      portuguese: 'nome'
    }),
    type: enumTypeRequired({
      data: MatchType,
      english: 'type',
      portuguese: 'tipo'
    })
  })
});
