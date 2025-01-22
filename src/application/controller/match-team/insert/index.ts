import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import { errorLogger, messageErrorResponse, ok, validationErrorResponse } from '@main/utils';
import { insertMatchTeamSchema } from '@data/validation';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

interface Players {
  name: string;
  kill: number;
}

interface Teams {
  position: number;
  players: Players[];
}

interface Body {
  matchId: string;
  teams: Teams[];
}

/**
 * @typedef {object} InsertPlayersMatchTeamBody
 * @property {string} name.required
 * @property {integer} kill.required
 */

/**
 * @typedef {object} InsertTeamsMatchTeamBody
 * @property {integer} position.required
 * @property {array<InsertPlayersMatchTeamBody>} players.required
 */

/**
 * @typedef {object} InsertMatchTeamBody
 * @property {string} matchId.required
 * @property {array<InsertTeamsMatchTeamBody>} teams.required
 */

/**
 * @typedef {object} InsertMatchTeamResponse
 * @property {Messages} message
 * @property {string} status
 * @property {MatchTeam} payload
 */

/**
 * POST /match-team
 * @summary Insert MatchTeam
 * @tags Match Team
 * @security BearerAuth
 * @param {InsertMatchTeamBody} request.body.required
 * @return {InsertMatchTeamResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 */
export const insertMatchTeamController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await insertMatchTeamSchema.validate(request, { abortEarly: false });

      const { matchId, teams } = request.body as Body;

      await DataSource.$transaction(async (tx) => {
        await Promise.all(
          teams.map(async (team) => {
            const { position, players } = team;

            await tx.matchTeam.create({
              data: {
                matchId,
                playerTeam: {
                  create: players.map((player) => ({
                    kill: player.kill,
                    player: {
                      connectOrCreate: {
                        create: { name: player.name },
                        where: { name: player.name }
                      }
                    }
                  }))
                },
                position
              }
            });
          })
        );
      });

      return ok({ response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError) return validationErrorResponse({ error, response });

      return messageErrorResponse({ error, response });
    }
  };
