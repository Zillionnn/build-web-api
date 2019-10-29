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

const menuModel = {
    menuList: (appId) => {
        return query(`select * from t_menu where app_id = $1`, [appId])
    },

    insertMenu: (body) => {
        const fields = ['app_id', 'name']
        const params = fields.map(f => {
            return body[f]
        })
        return query(`insert into t_menu (app_id,name) VALUES($1,$2)`, params)
    },
    updateMenu:(body)=>{
        const fields = ['id', 'name', 'link']
        const params = fields.map(f => {
            return body[f]
        })
        return query(`update t_menu set name=$2, set link=$3 where id=$1`, params)
    },
    deleteMenu:(menuId)=>{
        return query('delete from t_menu where id=$1', [menuId])
    }
}

module.exports = menuModel