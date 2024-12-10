import { ILogger, IMiddleware } from '@midwayjs/core';
import { App, Inject, Logger, Middleware } from '@midwayjs/core';
import { NextFunction, Context } from '@midwayjs/koa';
import { Tool } from '../utils/tool';
import { IApp } from '../interface';

@Middleware()
export class IsAuthMiddleware implements IMiddleware<Context, NextFunction> {
  @Inject()
  tool: Tool;

  @Logger()
  logger: ILogger;

  @App()
  app: IApp;

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const user = this.app.user;
      if (user['account'] == 'admin') {
        this.app.deptIds = await this.app.db
          .select('id')
          .from('department')
          .where('isDel', 0)
          .pluck('id');
        return await next();
      }

      const url = ctx.request.url.split('?')[0];
      // 获取用户权限列表
      const role: any = await this.app.db
        .select('`keys`')
        .from('role')
        .where('isDel', 0)
        .where('id', user['roleId'])
        .value();
      if (!role) throw new Error('未设置角色权限');
      let keys = await this.app.db
        .select('path')
        .from('menu')
        .where('isDel', 0)
        .where('type', 3)
        .where('id', 'in', role)
        .find();
      keys = keys.map(x => x.path);
      if (!keys.includes(url)) throw new Error('暂无权限访问！');
      this.app.deptIds = (role.deptIds || '').split(',').filter(x => !!x);
      await next();
    };
  }
}
