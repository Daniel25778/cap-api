import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import { errorLogger, messageErrorResponse, ok, validationErrorResponse } from '@main/utils';
import { insertMatchSchema } from '@data/validation';
import { matchFindParamsSimple } from '@data/search';
import type { Controller } from '@application/protocols';
import type { MatchType } from '@prisma/client';
import type { Request, Response } from 'express';

interface Body {
  name: string;
  description?: string;
  type: MatchType;
}

/**
 * @typedef {object} InsertMatchBody
 * @property {string} name.required
 * @property {string} description
 * @property {string} type.required -enum:NORMAL,TOURNAMENT
 */

/**
 * @typedef {object} InsertMatchResponse
 * @property {Messages} message
 * @property {string} status
 * @property {Match} payload
 */

/**
 * POST /match
 * @summary Insert Match
 * @tags Match
 * @security BearerAuth
 * @param {InsertMatchBody} request.body.required
 * @return {InsertMatchResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 */
export const insertMatchController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await insertMatchSchema.validate(request, { abortEarly: false });

      const { name, type, description } = request.body as Body;

      const payload = await DataSource.match.create({
        data: { description, name, type },
        select: matchFindParamsSimple
      });

      return ok({ payload, response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError) return validationErrorResponse({ error, response });

      return messageErrorResponse({ error, response });
    }
  };
