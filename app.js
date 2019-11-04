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


// ################################### app ########################
router.get('/api/app/list', showTest);
router.post('/api/app/add', addApp)
router.delete(`/api/app/:id`, deleteApp)
router.get(`/api/app/:app_id`, getAppById)
router.put(`/api/app/:app_id`, updateApp)

// 菜单列表
router.get(`/api/app/menu/:id`, menuList)
// 添加一个菜单
router.post(`/api/app/menu/add`, addMenu)
// 更新菜单
router.put(`/api/app/menu/:id`, updateMenu)
// 删除一个菜单
router.delete(`/api/app/menu/:id`, deleteMenu)
// ################################页面##########################
// 创建一个页面
router.post(`/api/createPage`, createPage)
// 页面列表
router.get(`/api/app/page/:id`, appPages)
// 更新页面名字
router.put(`/api/app/page/:page_id`, updatePageName)
// 页面detail
router.get(`/api/app/page/detail/:page_id`, pageDetail)
// 更新页面的component
router.put(`/api/app/page/components/:page_id`, updatePageComponents)
// 删除一个页面
router.delete(`/api/app/page/:page_id`, deletePage)

// ############################路由######################
router.get(`/api/v1/routers`, b6)

// 图表数据格式
router.get(`/api/v1/chartdata`, chartData)
router.get(`/api/v1/chartdata/pie`, chartDataPietaobao)
router.get(`/api/v1/pie`, chartDataPie)

async function chartDataPietaobao(ctx) {
  const data = [
   10,20
  ]
	ctx.response.body=data
}
async function chartDataPie(ctx) {
  const data = [
  {value:10,name:'系列1'},
  {value:30,name:'系列2'}
  ]
	nResponse(ctx, 0, '', data)
}

async function chartData (ctx) {
	const data = [
    ['Mon', 820,4],
    ['Ton', 100,44],
    ['Wed', 200,67],
    ['Thu', 300,76],
    ['Fri', 400,2],
    ['Sat', 50,0],
    ['Sun', 24,99],
  ]
	ctx.response.body=data
}

async function b6(ctx) {
  ctx.response.body = {
    code: 0,
    message: '',
    data: [
      {
        path: '/home/foo',
        name: 'Foo',
      },
      {
        path: '/home/bar',
        name: 'Bar'
      }
    ]
  }
}


function nResponse(ctx, code = 0, message = '', data = null) {
  ctx.response.body = {
    code: code,
    message: message,
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

async function updateMenu(ctx) {
  const body = ctx.request.body
  body.menu_id = ctx.params.id
  const r = await menuMoedel.updateMenu(body)
  nResponse(ctx, 0., '')
}
async function deleteMenu(ctx) {
  const menu_id = ctx.params.id
  const r = await menuMoedel.deleteMenu(menu_id)
  nResponse(ctx, 0, '')
}

async function createPage(ctx) {
  const body = ctx.request.body
  const r = await pageModel.addPage(body)
  nResponse(ctx, 0, '')
}

async function updatePageName(ctx) {
  const body = ctx.request.body
  body.page_id = ctx.params.page_id
  const r = await pageModel.updatePageName(body)
  nResponse(ctx, 0, '', r)
}

async function pageDetail(ctx) {
  const id = ctx.params.page_id
  const r = await pageModel.pageDetail(id)
  nResponse(ctx, 0, '', r[0])
}

async function updatePageComponents(ctx) {
  const body = ctx.request.body
  body.page_id = ctx.params.page_id
  const r = await pageModel.updatePageComponent(body)
  nResponse(ctx, 0, '', r)
}

async function deletePage(ctx) {
  const page_id = ctx.params.page_id
  const r = await pageModel.deletePageByPageId(page_id)
  nResponse(ctx)
}

async function getAppById(ctx) {
  const appId = ctx.params.app_id
  const r = await appModel.appInfo(appId)
  nResponse(ctx, 0, 'success', r[0])
}

async function updateApp(ctx) {
  const app = ctx.request.body
  const r = await appModel.updateApp(app)
  nResponse(ctx, 0, 'success', r[0])
}

if (!module.parent) app.listen(7000);