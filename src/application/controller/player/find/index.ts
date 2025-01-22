import { DataSource } from '@infra/database';
import {
  errorLogger,
  getGenericFilter,
  getPagination,
  messageErrorResponse,
  ok
} from '@main/utils';
import { playerFindParams } from '@data/search';
import { playerListQueryFields } from '@data/validation';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';
import type { playerQueryFields } from '@data/validation';

/**
 * @typedef {object} FindPlayerPayload
 * @property {array<Player>} content
 * @property {number} totalElements
 * @property {number} totalPages
 */

/**
 * @typedef {object} FindPlayerResponse
 * @property {Messages} message
 * @property {string} status
 * @property {FindPlayerPayload} payload
 */

/**
 * GET /player
 * @summary Find Players
 * @tags Player
 * @security BearerAuth
 * @param {string} name.query
 * @param {string} nickname.query
 * @param {string} instagram.query
 * @param {boolean} isMemberBoolean.query
 * @param {boolean} isOnGuildBoolean.query
 * @param {integer} page.query
 * @param {integer} limit.query
 * @param {string} startDate.query (Ex: 2024-01-01).
 * @param {string} endDate.query (Ex: 2024-01-01).
 * @param {string} orderBy.query - enum:name,nickname,isMember,isOnGuild,createdAt,updatedAt
 * @param {string} sort.query - enum:asc,desc
 * @return {FindPlayerResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 */
export const findPlayerController: Controller =
  () =>
  async ({ query }: Request, response: Response) => {
    try {
      const { skip, take } = getPagination({ query });
      const { orderBy, where } = getGenericFilter<playerQueryFields>({
        list: playerListQueryFields,
        query
      });

      const search = await DataSource.player.findMany({
        orderBy,
        select: playerFindParams,
        skip,
        take,
        where
      });

      const totalElements = await DataSource.player.count({
        where
      });

      return ok({
        payload: {
          content: search,
          totalElements,
          totalPages: Math.ceil(totalElements / take)
        },
        response
      });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, response });
    }
  };
