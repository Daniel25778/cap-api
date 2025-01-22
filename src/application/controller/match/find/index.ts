import { DataSource } from '@infra/database';
import {
  errorLogger,
  getGenericFilter,
  getPagination,
  messageErrorResponse,
  ok
} from '@main/utils';
import { matchFindParams } from '@data/search';
import { matchListQueryFields } from '@data/validation';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';
import type { matchQueryFields } from '@data/validation';

/**
 * @typedef {object} FindMatchPayload
 * @property {array<Match>} content
 * @property {number} totalElements
 * @property {number} totalPages
 */

/**
 * @typedef {object} FindMatchResponse
 * @property {Messages} message
 * @property {string} status
 * @property {FindMatchPayload} payload
 */

/**
 * GET /match
 * @summary Find Matches
 * @tags Match
 * @security BearerAuth
 * @param {string} name.query
 * @param {string} description.query
 * @param {string} typeEnum.query
 * @param {integer} page.query
 * @param {integer} limit.query
 * @param {string} startDate.query (Ex: 2024-01-01).
 * @param {string} endDate.query (Ex: 2024-01-01).
 * @param {string} orderBy.query - enum:name,description,type,createdAt,updatedAt
 * @param {string} sort.query - enum:asc,desc
 * @return {FindMatchResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 */
export const findMatchController: Controller =
  () =>
  async ({ query }: Request, response: Response) => {
    try {
      const { skip, take } = getPagination({ query });
      const { orderBy, where } = getGenericFilter<matchQueryFields>({
        list: matchListQueryFields,
        query
      });

      const search = await DataSource.match.findMany({
        orderBy,
        select: matchFindParams,
        skip,
        take,
        where
      });

      const totalElements = await DataSource.match.count({
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
