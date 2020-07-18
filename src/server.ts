import Koa from 'koa';
import route from 'koa-route';
import serve from 'koa-static';
import path from 'path';
import got from 'got';
import cheerio from 'cheerio';

const app = new Koa();

/** 请求日志 */
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${new Date().toISOString()} ${ctx.method} ${ctx.url} - ${rt}`);
});

/** 静态服务 */
app.use(serve(`${path.join(__dirname)}/public`));

/** 搜索内容，使用神马搜索 */
app.use(route.get('/api/search', async (ctx, netx) => {
  /** 需要搜索的小说名称 */
  const { text = '' } = ctx.query;
  const response = await got(`https://m.sm.cn/s?q=${text}`);
  const html = response.body;

  const $ = cheerio.load(html);
  ctx.body = $('.sc.c-container').map((index, item) => {
    const url = $(item).find('a').attr('href');
    console.log('-----------------------');
    $(item).find('script,style').remove();
    console.log(url, $(item).html());

    return `<div class="111">${$(item).html()}</div>`;
  }).get().join('');
}));

app.listen(3000);
/* eslint-disable-next-line no-console */
console.log('http://192.168.50.230:3000');
