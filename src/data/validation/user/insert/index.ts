import { emailRequired, stringRequired } from '@main/utils';
import { yup } from '@infra/yup';

export const insertUserSchema = yup.object().shape({
  body: yup.object().shape({
    email: emailRequired(),
    password: stringRequired({
      english: 'password',
      portuguese: 'senha'
    })
  })
});
