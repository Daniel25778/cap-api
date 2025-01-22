import { Router } from 'express';
import { insertMatchTeamController } from '@application/controller/match-team';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post('/', insertMatchTeamController());

  inputRouter.use('/match-team', router);
};
