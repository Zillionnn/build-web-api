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
    insert: (p) => {
        const fields = [
            'name', 'page_ids', 'menu_ids'
        ]
        const params = fields.map(f => {
            return p[f]
        })
        return query('insert into t_app values(name=$1,page_ids=$2,menu_ids=$3)', params)
    }
}
module.exports = appModel