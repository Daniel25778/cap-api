import { arrayRequired, numberRequired, stringRequired } from '@main/utils';
import { yup } from '@infra/yup';

export const insertMatchTeamSchema = yup.object().shape({
  body: yup.object().shape({
    matchId: stringRequired({
      english: 'match id',
      portuguese: 'id da partida'
    }),
    teams: arrayRequired(
      yup.object().shape({
        players: arrayRequired(
          yup.object().shape({
            kill: numberRequired({
              english: 'kill',
              portuguese: 'kills'
            }),
            name: stringRequired({
              english: 'name',
              portuguese: 'nome'
            })
          }),
          {
            english: 'players',
            portuguese: 'jogadores'
          }
        ),
        position: numberRequired({
          english: 'position',
          portuguese: 'posição'
        })
      }),
      {
        english: 'teams',
        portuguese: 'times'
      }
    )
  })
});
