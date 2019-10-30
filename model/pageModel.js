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
        return query(`select id, app_id,page_id,name,update_time from t_page where app_id=$1 order by update_time asc;`, [appId])
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
    },
    updatePageName: (body) => {
        const fields = ['page_id', 'name']
        const params = fields.map(f => {
            return body[f]
        })
        return query(`update t_page set name=$2 where page_id=$1`, params)
    },

    pageDetail: (pageId) => {
        return query(`select * from t_page where page_id=$1`, [pageId])
    },

    updatePageComponent: (body) => {
        const fields = ['page_id', 'components']
        const params = fields.map(f => {
            return body[f]
        })
        return query(`update t_page set components=$2 where page_id=$1`, params)
    },

    deletePageByPageId(pageId) {
        return query(`delete from t_page where page_id=${pageId}`)
    }
}
module.exports = pageModel