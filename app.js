const logger = require('koa-logger');
const Router = require('koa-router');
const koaBody = require('koa-body');
const cors = require('koa-cors');
const Koa = require('koa');
const app = module.exports = new Koa();


const appModel = require('./model/appModel')

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

if (!module.parent) app.listen(7000);