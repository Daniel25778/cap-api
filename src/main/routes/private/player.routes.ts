import { Router } from 'express';
import {
  deletePlayerController,
  findOnePlayerController,
  findPlayerController,
  insertPlayerController,
  updatePlayerController
} from '@application/controller/player';

export default (inputRouter: Router): void => {
  const router = Router();

  router.get('', findPlayerController());
  router.post('/', insertPlayerController());
  router.get('/:id', findOnePlayerController());
  router.put('/:id', updatePlayerController());
  router.delete('/:id', deletePlayerController());

  inputRouter.use('/player', router);
};
