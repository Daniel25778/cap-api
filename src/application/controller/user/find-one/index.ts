import { DataSource } from '@infra/database';
import { errorLogger, messageErrorResponse, notFound, ok } from '@main/utils';
import { userFindParams } from '@data/search';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

/**
 * @typedef {object} FindOneUserResponse
 * @property {Messages} message
 * @property {string} status
 * @property {User} payload
 */

/**
 * GET /user/{id}
 * @summary Find one User
 * @tags User
 * @security BearerAuth
 * @param {string} id.path.required
 * @return {FindOneUserResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {NotFoundRequest} 404 - Not found response - application/json
 */
export const findOneUserController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      const payload = await DataSource.user.findUnique({
        select: userFindParams,
        where: { id: request.params.id }
      });

      if (payload === null)
        return notFound({
          entity: { english: 'User', portuguese: 'Usuário' },
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
