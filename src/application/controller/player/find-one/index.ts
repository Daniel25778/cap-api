import { DataSource } from '@infra/database';
import { errorLogger, messageErrorResponse, notFound, ok } from '@main/utils';
import { playerFindParams } from '@data/search';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

/**
 * @typedef {object} FindOnePlayerResponse
 * @property {Messages} message
 * @property {string} status
 * @property {Player} payload
 */

/**
 * GET /player/{id}
 * @summary Find one Player
 * @tags Player
 * @security BearerAuth
 * @param {string} id.path.required
 * @return {FindOnePlayerResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {NotFoundRequest} 404 - Not found response - application/json
 */
export const findOnePlayerController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      const payload = await DataSource.player.findUnique({
        select: playerFindParams,
        where: { id: request.params.id }
      });

      if (payload === null)
        return notFound({
          entity: { english: 'Player', portuguese: 'Jogador' },
          response
        });

      return ok({
        payload,
        response
      });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, response });
    }
  };
