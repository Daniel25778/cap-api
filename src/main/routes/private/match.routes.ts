import { Router } from 'express';
import {
  deleteMatchController,
  findMatchController,
  findOneMatchController,
  insertMatchController,
  updateMatchController
} from '@application/controller/match';

export default (inputRouter: Router): void => {
  const router = Router();

  router.get('', findMatchController());
  router.post('/', insertMatchController());
  router.get('/:id', findOneMatchController());
  router.put('/:id', updateMatchController());
  router.delete('/:id', deleteMatchController());

  inputRouter.use('/match', router);
};
