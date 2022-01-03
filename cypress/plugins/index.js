const { Pool } = require('pg')


function queryTestDb(query, config) {
    const pool = new Pool({ // use config values from cypress.json
        user: 'postgres',
        host: 'localhost',
        database: 'florida_pets',
        password: 'password',
        port: 5432,
    })

    return new Promise((resolve, reject) => {
        pool.query(query, (err, res) => {
            if (err) {
                console.log(err ? err.stack : res.rows[0].message) // Hello World!
                pool.end()

                reject(err)
            }
            else {
                pool.end()

                return resolve(res)
            }
        });
    });
}

module.exports = (on, config) => {
  // use as follows: cy.task('queryDb', query)
  on('task', {
    queryDb: query => {
      return queryTestDb(query, config)
    },
  })
}
