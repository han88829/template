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
          return ctx.body = { code: 200, data: ctx.body };
        }
      } catch (error) {
        ctx.logger.error('发生错误--', error);
        ctx.body = {
          code: error.status || 0,
          message: error.message
        };
      }
    };
  }
}
