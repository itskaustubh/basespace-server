const { Pool } = require('pg')

const pool = new Pool({
  user: 'yrsmjowe',
  password: 'TYF6Yanbi1_V_y7W3uMG7J0Qmo805TBO',
  host: 'abul.db.elephantsql.com',
  port: 5432,
  database: 'yrsmjowe'
})

module.exports = pool