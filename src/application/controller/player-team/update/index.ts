import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import { errorLogger, messageErrorResponse, ok, validationErrorResponse } from '@main/utils';
import { playerFindParams } from '@data/search';
import { updatePlayerTeamSchema } from '@data/validation';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

interface Body {
  kill: number;
}

/**
 * @typedef {object} UpdatePlayerTeamBody
 * @property {number} kill.required
 */

/**
 * @typedef {object} UpdatePlayerTeamResponse
 * @property {Messages} message
 * @property {string} status
 * @property {PlayerTeam} payload
 */

/**
 * PUT /player-team/{id}
 * @summary Update Player Team
 * @tags Player Team
 * @security BearerAuth
 * @param {UpdatePlayerTeamBody} request.body
 * @param {string} id.path.required
 * @return {UpdatePlayerTeamResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const updatePlayerTeamController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await updatePlayerTeamSchema.validate(request, { abortEarly: false });

      const { kill } = request.body as Body;

      const payload = await DataSource.playerTeam.update({
        data: { kill },
        select: { id: true, kill: true, player: { select: playerFindParams } },
        where: { id: request.params.id }
      });

      return ok({ payload, response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError) return validationErrorResponse({ error, response });

      return messageErrorResponse({ error, response });
    }
  };
