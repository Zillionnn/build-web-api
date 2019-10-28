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
const pageModel = {
    /**
   * 按app id  查页面列表
   */
    pageListByAppId: (appId) => {
        return query(`select * from t_page where app_id=$1`, [appId])
    },

    addPage: (body) => {
        const fields = ['name', 'components', 'app_id']
        const params = fields.map(f => {
            return body[f]
        })
        return query(`insert into t_page(name,components,app_id) VALUES($1,$2,$3)`, params)
    },



    deletePage: (p) => {
        return query(`DELETE FROM t_app WHERE id=$1`, [p])
    }
}
module.exports = pageModel