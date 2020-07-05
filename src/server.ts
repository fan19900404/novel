import Koa from 'koa';
import route from 'koa-route';
import serve from 'koa-static';
import path from 'path';

const app = new Koa();

/** 请求日志 */
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${(new Date()).toISOString()} ${ctx.method} ${ctx.url} - ${rt}`);
});

/** 静态服务 */
app.use(serve(`${path.join(__dirname)}/public`));

app.listen(3000);
/* eslint-disable-next-line no-console */
console.log('http://192.168.50.230:3000');
