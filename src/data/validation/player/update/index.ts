import { booleanNotRequired, stringNotRequired } from '@main/utils';
import { yup } from '@infra/yup';

export const updatePlayerSchema = yup.object().shape({
  body: yup.object().shape({
    instagram: stringNotRequired(),
    isMember: booleanNotRequired(),
    isOnGuild: booleanNotRequired(),
    name: stringNotRequired(),
    nickname: stringNotRequired()
  })
});
