/**
 * @typedef {object} SimpleMatch
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} type - enum:NORMAL,TOURNAMENT
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {object} Match
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} type - enum:NORMAL,TOURNAMENT
 * @property {array<MatchTeam>} matchTeam
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {object} PlayerTeam
 * @property {string} id
 * @property {integer} kill
 * @property {Player} player
 */
