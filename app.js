const logger = require('koa-logger');
const Router = require('koa-router');
const koaBody = require('koa-body');
const cors = require('koa-cors');
const Koa = require('koa');
const app = module.exports = new Koa();


const appModel = require('./model/appModel')
const pageModel = require('./model/pageModel')
const menuMoedel = require('./model/menuModel')

const request = require('request')
// "database"

const posts = [];

// middleware

app.use(logger());
app.use(cors())


// app.use(render);

app.use(koaBody({ multipart: true }));
var router = new Router();
app.use(router.routes())

app.use(async (ctx, next) => {
  console.log(new Date())
  next()
});

router.get('/api/app/list', showTest);
router.post('/api/app/add', addApp)
router.delete(`/api/app/:id`, deleteApp)
router.get(`/api/app/page/:id`, appPages)
// 菜单列表
router.get(`/api/app/menu/:id`, menuList)
// 添加一个菜单
router.post(`/api/app/menu/add`, addMenu)
router.put(`/api/app/menu/:id`, updateMenu)
router.delete(`/api/app/menu/:id`, deleteMenu)

function nResponse(ctx, code, message, data=null) {
  ctx.response.body = {
    code: 0,
    message: '',
    data: data
  }
}

async function showTest(ctx) {
  const r = await appModel.list()
  console.log(r)
  ctx.response.body = {
    code: 0,
    message: 'good',
    data: r
  }
}

async function addApp(ctx) {
  console.log(ctx.request.body)
  const params = ctx.request.body
  const r = await appModel.insert(params)
  console.log(r)
  ctx.response.body = {
    code: 0,
    message: 'good',
    data: r
  }
}

async function deleteApp(ctx) {
  const id = ctx.params.id
  await appModel.deleteApp(id)
  ctx.response.body = {
    code: 0,
    message: 'success'
  }
}

async function appPages(ctx) {
  const appId = ctx.params.id
  const r = await pageModel.pageListByAppId(appId)
  ctx.response.body = {
    code: 0,
    message: '',
    data: r
  }
}

async function menuList(ctx) {
  const appId = ctx.params.id
  const r = await menuMoedel.menuList(appId)
  ctx.response.body = {
    code: 0,
    message: '',
    data: r
  }
}

async function addMenu(ctx) {
  const body = ctx.request.body
  const r = await menuMoedel.insertMenu(body)
  nResponse(ctx, 0, '')
}

async function updateMenu(ctx){
  const body = ctx.request.body
  const r = await menuMoedel.updateMenu(body)
  nResponse(ctx,0.,'')
}
async function deleteMenu(ctx){
  const body = ctx.request.body
  const r = await menuMoedel.deleteMenu(body)
  nResponse(ctx, 0, '')
}
if (!module.parent) app.listen(7000);