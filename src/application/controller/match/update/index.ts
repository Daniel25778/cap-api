import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import { errorLogger, messageErrorResponse, ok, validationErrorResponse } from '@main/utils';
import { matchFindParamsSimple } from '@data/search';
import { updateMatchSchema } from '@data/validation';
import type { Controller } from '@application/protocols';
import type { MatchType } from '@prisma/client';
import type { Request, Response } from 'express';

interface Body {
  name: string;
  description?: string;
  type: MatchType;
}

/**
 * @typedef {object} UpdateMatchBody
 * @property {string} name
 * @property {string} description
 * @property {string} type -enum:NORMAL,TOURNAMENT
 */

/**
 * @typedef {object} UpdateMatchResponse
 * @property {Messages} message
 * @property {string} status
 * @property {SimpleMatch} payload
 */

/**
 * PUT /match/{id}
 * @summary Update Match
 * @tags Match
 * @security BearerAuth
 * @param {UpdateMatchBody} request.body
 * @param {string} id.path.required
 * @return {UpdateMatchResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const updateMatchController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      // if (!userIsOwner(request))
      //   return forbidden({
      //     message: { english: 'update this match', portuguese: 'atualizar este jogador' },
      //     response
      //   });

      await updateMatchSchema.validate(request, { abortEarly: false });

      const { name, type, description } = request.body as Body;

      const payload = await DataSource.match.update({
        data: { description, name, type },
        select: matchFindParamsSimple,
        where: { id: request.params.id }
      });

      return ok({ payload, response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError) return validationErrorResponse({ error, response });

      return messageErrorResponse({ error, response });
    }
  };
