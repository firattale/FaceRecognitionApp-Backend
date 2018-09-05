const knex = require('knex')({
    client: 'pg',
    connection:{
        connectionString:process.env.DATABASE_URL,
        ssh:true,
    }
});

module.exports = {
	knex
}