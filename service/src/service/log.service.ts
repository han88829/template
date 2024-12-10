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
    return await this.app.db
      .select('l.*', 'u.name as userName')
      .from('log  as l')
      .joinRaw('left join user u on u.id=l.userId')
      ._where('l.content,u.name', 'keywords', params.keyword, 'ifHave')
      ._where('l.createTime', '>=', params.startTime, 'ifHave')
      ._where('l.createTime', '<=', params.endTime, 'ifHave')
      ._where('l.type', '', params.type, 'ifHave')
      .orderby('l.id desc')
      .page(params.page || 1, params.pageSize || 10);
  }

  async insert(type: Number, content: string, user = this.app.user) {
    return await this.app.db('log').insert({
      type,
      content,
      userId: user.id,
    });
  }
}
