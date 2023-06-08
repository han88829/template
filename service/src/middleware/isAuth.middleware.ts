import { ILogger, IMiddleware } from '@midwayjs/core';
import { App, Inject, Logger, Middleware } from '@midwayjs/core';
import { NextFunction, Context } from '@midwayjs/koa';
import { Tool } from '../utils/tool';

@Middleware()
export class IsAuthMiddleware implements IMiddleware<Context, NextFunction> {

    @Inject()
    tool: Tool;

    @Logger()
    logger: ILogger;

    @App()
    app;

    resolve() {
        return async (ctx: Context, next: NextFunction) => {
            const user = this.app.user;
            if (user['account'] == 'admin') return await next();

            const url = ctx.request.url.split('?')[0];
            // 获取用户权限列表
            const role = await this.app.db.select('`keys`').from('role').where('id', user['roleId']).value();
            if (!role) throw new Error('未设置角色权限');
            let keys = await this.app.db.select('path').from('menu').where('type', 3).where('id', role, 'in').find();
            keys = keys.map(x => x.path);
            if (!keys.includes(url)) throw new Error('暂无权限访问！');
            this.app.deptIds = role.deptIds;
            await next();
        };
    }
}
