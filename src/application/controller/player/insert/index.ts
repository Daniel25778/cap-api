import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import { errorLogger, messageErrorResponse, ok, validationErrorResponse } from '@main/utils';
import { insertPlayerSchema } from '@data/validation';
import { playerFindParams } from '@data/search';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

interface Body {
  name: string;
  nickname?: string;
  instagram?: string;
  isOnGuild?: boolean;
  isMember?: boolean;
}

/**
 * @typedef {object} InsertPlayerBody
 * @property {string} name.required
 * @property {string} nickname
 * @property {string} instagram
 * @property {string} isOnGuild
 * @property {string} isMember
 */

/**
 * @typedef {object} InsertPlayerResponse
 * @property {Messages} message
 * @property {string} status
 * @property {Player} payload
 */

/**
 * POST /player
 * @summary Insert Player
 * @tags Player
 * @security BearerAuth
 * @param {InsertPlayerBody} request.body.required
 * @return {InsertPlayerResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 */
export const insertPlayerController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await insertPlayerSchema.validate(request, { abortEarly: false });

      const { name, instagram, isMember, isOnGuild, nickname } = request.body as Body;

      const payload = await DataSource.player.create({
        data: { instagram, isMember, isOnGuild, name, nickname },
        select: playerFindParams
      });

      return ok({ payload, response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError) return validationErrorResponse({ error, response });

      return messageErrorResponse({ error, response });
    }
  };
