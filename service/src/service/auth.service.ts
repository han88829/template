import { App, Config, Inject, Provide } from '@midwayjs/core';
import { Tool } from '../utils/tool'
import * as _ from 'lodash';

@Provide()
export class AuthService {
  @App()
  app;

  @Inject()
  tool: Tool;

  @Config('pageSize')
  pageSize;

  async deptLst(name) {
    return await this.app.db.select('*').from('department')
      .where('name', name, 'like', 'ifHave')
      .orderby('id desc')
      .find();
  }

  async deptSave({ id, name }) {
    const db = this.app.db;
    const user = this.app.user;
    // 查询账号名称是否重复
    const isRepeat = await db.select('id').from('department').where('name', name).where('id', id, '<>', 'ifHave').findOne();
    if (isRepeat) throw new Error('账号已存在！');

    let res;
    if (id) res = await db.update('department', { name, userId: user['id'] }).where('id', id).execute();
    else res = await db.insert('department', {
      name, userId: user['id']
    }).execute();
    if (!res.affectedRows) throw new Error('操作失败');
    return true;
  }

  async deptDel(id) {
    const res = await this.app.db.delete('department').where('id', id).execute();
    if (!res.affectedRows) throw new Error('操作失败');
    return true;
  }

  async roleLst(name) {
    return await this.app.db.select('*').from('role')
      .where('name', name, 'like', 'ifHave')
      .orderby('id desc')
      .find();
  }

  async roleSave({ id, keys, deptIds, ...data }) {
    const db = this.app.db;
    const user = this.app.user;
    if (_.isArray(keys)) keys = keys.join();
    if (_.isArray(deptIds)) deptIds = deptIds.join();
    let res;
    if (id) res = await db.update('role', { ...data, deptIds, keys, userId: user['id'] }).where('id', id).execute();
    else res = await db.insert('role', {
      ...data, keys, deptIds, userId: user['id']
    }).execute();
    if (!res.affectedRows) throw new Error('操作失败');
    return true;
  }

  async roleDel(id) {
    const res = await this.app.db.delete('role').where('id', id).execute();
    if (!res.affectedRows) throw new Error('操作失败');
    return true;
  }

  async menuLst() {
    const db = this.app.db;
    const data = await db.select('*').from('menu').where('isDel', 0).orderby('sort').find();
    return data;
  }

  async menuSave(data) {
    const user = this.app.user;
    const res = await this.app.db.save('menu', { ...data, userId: user.id }).execute();
    if (!res) throw new Error('操作失败');
    return true;
  }

  async menuDel(id) {
    const res = await this.app.db.update('menu', { isDel: 1 }).where('id', id).execute();
    if (!res) throw new Error('操作失败');
    return true;
  }
}
