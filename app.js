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

router.get('/api/test', showTest);


async function showTest(ctx) {
  const r = await appModel.list()
  console.log(r)
  ctx.response.body = {
    code: 0,
    message: 'good',
    data:r
  }
}

if (!module.parent) app.listen(7000);