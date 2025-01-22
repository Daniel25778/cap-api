import { DataSource } from '@infra/database';
import { errorLogger, messageErrorResponse, notFound, ok } from '@main/utils';
import { matchFindParams } from '@data/search';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

/**
 * @typedef {object} FindOneMatchResponse
 * @property {Messages} message
 * @property {string} status
 * @property {Match} payload
 */

/**
 * GET /match/{id}
 * @summary Find one Match
 * @tags Match
 * @security BearerAuth
 * @param {string} id.path.required
 * @return {FindOneMatchResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {NotFoundRequest} 404 - Not found response - application/json
 */
export const findOneMatchController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      const payload = await DataSource.match.findUnique({
        select: matchFindParams,
        where: { id: request.params.id }
      });

      if (payload === null)
        return notFound({
          entity: { english: 'Match', portuguese: 'Partida' },
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
