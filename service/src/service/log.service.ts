import { App, Provide } from '@midwayjs/core';
import { IApp } from '../interface';

/**
 * 日志
 */
@Provide()
export class LogService {
    @App()
    app: IApp;

    async lst(params) {
        return await this.app.db.select('l.*,u.name as userName').from('log l')
            .join('left join user u on u.id=l.userId')
            .where('l.content,u.name', params.keyword, 'keywords', 'ifHave')
            .where('l.createTime', params.startTime, '>=', 'ifHave')
            .where('l.createTime', params.endTime, '<=', 'ifHave')
            .where('l.type', params.type, '', 'ifHave')
            .orderby('id desc')
            .page(params.page || 1, params.pageSize || 10);
    }

    async insert(type: Number, content: string, user = this.app.user) {
        return await this.app.db.insert('log', {
            type,
            content,
            userId: user.id
        }).execute();
    }
}
