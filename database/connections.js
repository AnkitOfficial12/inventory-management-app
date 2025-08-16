const knex = require('knex');
const knexConfig = require('./knexfile');
const EventEmitter = require('events');
const logger = require('../src/helpers/logger');

// Event emitter for database events
class DatabaseEmitter extends EventEmitter {}
const dbEmitter = new DatabaseEmitter();

// Create a new knex instance
const db = knex(knexConfig[process.env.NODE_ENV || 'development']);

// Handle database disconnects
db.client.pool.on('destroy', () => {
    logger.error('[DATABASE] connection destroyed');
    dbEmitter.emit('disconnected')
})

module.exports = { db, dbEmitter};
