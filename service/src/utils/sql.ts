



import { App, Config, Inject, Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { ILogger } from '@midwayjs/logger';
import { IApp } from '../interface';
import * as path from 'path';
/**
 * 帮助类
 */
@Provide()
@Scope(ScopeEnum.Request, { allowDowngrade: true })
export class Sql {
    @App()
    app: IApp;

    @Config('client')
    client;

    @Inject()
    logger: ILogger;

    async run() {
        try {
            // 检查数据库是否存在
            await this.isExistDatabase();
        } catch (error) {
            this.logger.error('数据库运行异常', error);
            this.logger.error(`请检查sql配置，并导入模版数据库。 ${path.join('../../sql/template.sql')}`,);
        }
    }

    async isExistDatabase(database = this.client.database) {
        await this.app.db.sql(`select * 
        from information_schema.SCHEMATA 
        where SCHEMA_NAME = ?; `, [database]).execute();
    }
}
