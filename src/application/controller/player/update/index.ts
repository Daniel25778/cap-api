import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import { errorLogger, messageErrorResponse, ok, validationErrorResponse } from '@main/utils';
import { playerFindParams } from '@data/search';
import { updatePlayerSchema } from '@data/validation';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

interface Body {
  name?: string;
  nickname?: string;
  instagram?: string;
  isOnGuild?: boolean;
  isMember?: boolean;
}

/**
 * @typedef {object} UpdatePlayerBody
 * @property {string} name
 * @property {string} nickname
 * @property {string} instagram
 * @property {string} isOnGuild
 * @property {string} isMember
 */

/**
 * @typedef {object} UpdatePlayerResponse
 * @property {Messages} message
 * @property {string} status
 * @property {Player} payload
 */

/**
 * PUT /player/{id}
 * @summary Update Player
 * @tags Player
 * @security BearerAuth
 * @param {UpdatePlayerBody} request.body
 * @param {string} id.path.required
 * @return {UpdatePlayerResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const updatePlayerController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      // if (!userIsOwner(request))
      //   return forbidden({
      //     message: { english: 'update this player', portuguese: 'atualizar este jogador' },
      //     response
      //   });

      await updatePlayerSchema.validate(request, { abortEarly: false });

      const { instagram, isMember, isOnGuild, name, nickname } = request.body as Body;

      const payload = await DataSource.player.update({
        data: { instagram, isMember, isOnGuild, name, nickname },
        select: playerFindParams,
        where: { id: request.params.id }
      });

      return ok({ payload, response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError) return validationErrorResponse({ error, response });

      return messageErrorResponse({ error, response });
    }
  };
