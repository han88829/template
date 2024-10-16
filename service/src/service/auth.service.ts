import { App, Config, Inject, Provide } from '@midwayjs/core';
import { Tool } from '../utils/tool';
import * as _ from 'lodash';
import { LogService } from './log.service';

@Provide()
export class AuthService {
  @App()
  app;

  @Inject()
  tool: Tool;

  @Config('pageSize')
  pageSize;

  @Inject()
  log: LogService;

  async deptLst(name) {
    return await this.app.db
      .select('*')
      .from('department')
      .where('name', name, 'like', 'ifHave')
      .where('isDel', 0)
      .orderby('id desc')
      .find();
  }

  async deptSave({ id, name }) {
    const db = this.app.db;
    const user = this.app.user;
    // 查询账号名称是否重复
    const isRepeat = await db
      .select('id')
      .from('department')
      .where('name', name)
      .where('id', id, '<>', 'ifHave')
      .findOne();
    if (isRepeat) throw new Error('账号已存在！');

    let res;
    if (id)
      res = await db
        .update('department', { name, userId: user['id'] })
        .where('id', id)
        .execute();
    else
      res = await db
        .insert('department', {
          name,
          userId: user['id'],
        })
        .execute();
    if (!res.affectedRows) throw new Error('操作失败');
    // 保存日志信息
    await this.log.insert(2, id ? `更新部门名称-${name}` : `新增部门-${name}`);
    return true;
  }

  async deptDel(id) {
    const res = await this.app.db
      .update('department', { isDel: 1 })
      .where('id', id)
      .execute();
    if (!res.affectedRows) throw new Error('操作失败');
    // 保存日志信息
    await this.log.insert(2, `删除部门-${id}`);
    return true;
  }

  async roleLst(name) {
    return await this.app.db
      .select('*')
      .from('role')
      .where('name', name, 'like', 'ifHave')
      .where('isDel', 0)
      .orderby('id desc')
      .find();
  }

  async roleSave({ id, keys, deptIds, ...data }) {
    const db = this.app.db;
    const user = this.app.user;
    if (_.isArray(keys)) keys = keys.join();
    if (_.isArray(deptIds)) deptIds = deptIds.join();
    let res;
    if (id)
      res = await db
        .update('role', { ...data, deptIds, keys, userId: user['id'] })
        .where('id', id)
        .execute();
    else
      res = await db
        .insert('role', {
          ...data,
          keys,
          deptIds,
          userId: user['id'],
        })
        .execute();
    if (!res.affectedRows) throw new Error('操作失败');
    await this.log.insert(
      2,
      id ? `更新角色名称-${data.name}` : `新增角色-${data.name}`
    );
    return true;
  }

  async roleDel(id) {
    const res = await this.app.db
      .update('role', { isDel: 1 })
      .where('id', id)
      .execute();
    if (!res.affectedRows) throw new Error('操作失败');
    await this.log.insert(2, `删除角色-${id}`);
    return true;
  }

  async menuLst() {
    const db = this.app.db;
    const data = await db
      .select('*')
      .from('menu')
      .where('isDel', 0)
      .orderby('sort')
      .find();
    return data;
  }

  async menuSave(data) {
    const user = this.app.user;
    const res = await this.app.db
      .save('menu', { ...data, userId: user.id })
      .execute();
    if (!res) throw new Error('操作失败');
    await this.log.insert(
      2,
      data.id ? `更新菜单-${data.name}` : `新增菜单-${data.name}`
    );
    return true;
  }

  async menuDel(id) {
    const res = await this.app.db
      .update('menu', { isDel: 1 })
      .where('id', id)
      .execute();
    if (!res) throw new Error('操作失败');
    await this.log.insert(2, `删除菜单-${id}`);
    return true;
  }
}
