import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/core';
import { NextFunction, Context } from '@midwayjs/koa';

@Middleware()
export class ReportMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      try {
        await next();
        // isCustom === true 自定义返回类型
        if (!ctx.isCustom) {
          ctx.status = 200;
          return (ctx.body = { code: 200, data: ctx.body });
        }
      } catch (error) {
        const req = ctx.request;
        const logFormat = `\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
Request original url: ${req.originalUrl}
Method: ${req.method}
IP: ${req.headers['x-real-ip']}  
Query: ${JSON.stringify(req.query)}
Token: ${ctx.headers.authorization}
Body: ${JSON.stringify(
          req.body
        )} \n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n`;
        ctx.logger.error(logFormat, error);
        if (error.status >= 404) ctx.status = error.status;
        ctx.body = {
          code: error.status || 0,
          message: error.message,
        };
      }
    };
  }
}
