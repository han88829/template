import { CacheManager } from '@midwayjs/cache';
import { ILogger, IMiddleware } from '@midwayjs/core';
import { App, Inject, Logger, Middleware } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';
import { Tool } from '../utils/tool';

@Middleware()
export class IsLoginMiddleware implements IMiddleware<Context, NextFunction> {

  @Inject()
  tool: Tool;

  @Logger()
  logger: ILogger;

  @App()
  app;

  @Inject()
  cache: CacheManager;

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      try {
        const token = ctx.get('Authorization');
        const { id, secret } = this.tool.decrypt(token);
        let user = await this.cache.get(`user-${id}`);
        if (!user) {
          user = await this.app.db.select('*').from('user').where('id', id).findOne();
          await this.cache.set(`user-${id}`, user, { ttl: 60 * 60 * 24 });
        }
        // 验证密码信息是否过期
        if (this.tool.md5(user['account'] + 'secret' + user['password']) != secret) throw new Error('密码过期，请重新登录！');
        if (user['disable'] == 1) throw new Error('账号已停用！');

        this.app.user = user;

      } catch (error) {
        this.logger.error(`登录验证错误`, error);
        ctx.isCustom = true;
        ctx.body = {
          code: 403,
          message: error.message
        }
        return
      }

      await next();
    };
  }
}
