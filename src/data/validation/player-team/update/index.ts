import { numberRequired } from '@main/utils';
import { yup } from '@infra/yup';

export const updatePlayerTeamSchema = yup.object().shape({
  body: yup.object().shape({
    kill: numberRequired({ english: 'kill', portuguese: 'kill' })
  })
});
