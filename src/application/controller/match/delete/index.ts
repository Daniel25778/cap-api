import { DataSource } from '@infra/database';
import { badRequest, errorLogger, ok } from '@main/utils';
import { messages } from '@domain/helpers';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

/**
 * @typedef {object} DeleteMatchResponse
 * @property {Messages} message
 * @property {string} status
 */

/**
 * DELETE /match/{id}
 * @summary Delete Match
 * @tags Match
 * @security BearerAuth
 * @param {string} id.path.required
 * @return {DeleteMatchResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const deleteMatchController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      // if (!userIsOwner(request))
      //   return forbidden({
      //     message: { english: 'delete this match', portuguese: 'deletar esta partida' },
      //     response
      //   });

      await DataSource.match.update({
        data: { finishedAt: new Date() },
        select: { id: true },
        where: { id: request.params.id }
      });

      return ok({ payload: messages.default.successfullyDeleted, response });
    } catch (error) {
      errorLogger(error);
      return badRequest({ message: messages.default.badRequest, response });
    }
  };
