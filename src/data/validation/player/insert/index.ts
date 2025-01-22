import { booleanNotRequired, stringNotRequired, stringRequired } from '@main/utils';
import { yup } from '@infra/yup';

export const insertPlayerSchema = yup.object().shape({
  body: yup.object().shape({
    instagram: stringNotRequired(),
    isMember: booleanNotRequired(),
    isOnGuild: booleanNotRequired(),
    name: stringRequired({
      english: 'name',
      portuguese: 'nome'
    }),
    nickname: stringNotRequired()
  })
});
