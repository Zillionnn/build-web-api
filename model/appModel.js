const PgPool = require('../pg/index')

const pg = new PgPool()
let query = (sql, params) => {
    return pg.query(sql, params)
        .then(r => {
            return r.rows
        })
        .catch(err => {
            return Promise.reject(err)
        })
}
const appModel = {
    list: () => {
        return query('select * from t_app')
    },
    appInfo: (appId) => {
        return query(`select * from t_app where id=${appId};`)
    },
    insert: (p) => {
        const fields = [
            'name',
        ]
        const params = fields.map(f => {
            return p[f]
        })
        return query(`INSERT INTO t_app(name) values($1)`, params)
    },
    updateApp(p) {
        const fields = [
          'id', 'name','layout'
        ]
        const params = fields.map(f => {
            return p[f]
        })
        return query(`update t_app set name=$2,layout=$3 where id=$1`, params)
    },
    deleteApp: (p) => {
        return query(`DELETE FROM t_app WHERE id=$1`, [p])
    }
}
module.exports = appModel