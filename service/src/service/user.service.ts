import { App, Config, Inject, Provide } from '@midwayjs/core';
import { Tool } from '../utils/tool';
import * as _ from 'lodash';
import { CacheManager } from '@midwayjs/cache';

@Provide()
export class UserService {
  @App()
  app;

  @Inject()
  tool: Tool;

  @Config('pageSize')
  pageSize;

  @Inject()
  cache: CacheManager;

  async login(data) {
    const db = await this.app.db;
    const password = this.tool.md5(data['account'] + data['password']);
    console.log(password);

    const user = await db.select('*').from('user').where('account', data['account']).where('disable', 0).findOne();
    if (!user) throw new Error('用户不存在！');
    if (user['password'] !== password) throw new Error('密码错误！');
    const token = this.tool.encrypt({
      id: user['id'],
      secret: this.tool.md5(data['account'] + 'secret' + password),
    });
    // 保存用户信息到redis
    await this.cache.set(`user-${user['id']}`, user, { ttl: 3600 * 24 });
    delete user.password;

    return token
  }

  async list(params) {
    const db = this.app.db;
    const data = await db.select('u.id,u.name,u.account,u.disable,u.mobile,u.roleId,u.deptId,d.name as deptName,u.ava,r.name as roleName').from('user u')
      .join('left join role r on r.id=u.roleId')
      .join('left join department d on d.id=u.deptId')
      .where('u.name,u.account', params.name, 'keywords', 'ifHave').orderby('id desc').page(params.page, this.pageSize)
    return data
  }

  async roleList() {
    const db = this.app.db;
    const data = await db.select('id,name').from('role').orderby('id desc').find();
    return data
  }

  async disableUser(id: number) {
    const db = this.app.db;
    const user = await db.select('*').from('user').where('id', id).findOne();
    if (user['account'] === 'admin') throw new Error('不能停用管理员账号');
    if (!user) throw new Error(`用户不存在`);

    const disable = user['disable'] === 1 ? 0 : 1;
    const res = await db.update('user', { disable }).where('id', id).execute();
    if (!res.affectedRows) throw new Error('操作失败');
    await this.update({ ...user, disable });
    return true;
  }

  async userSave({ name, account, mobile, id, password, roleId, deptId }) {
    const db = this.app.db;
    const insertData = {
      name, account, mobile, id, password, roleId, deptId
    };
    let res;
    if (insertData['password']) insertData['password'] = this.tool.md5(insertData['account'] + insertData['password']);
    else delete insertData['password'];

    // 查询账号名称是否重复
    const isRepeat = await db.select('id').from('user').where('account', account).where('id', id, '<>', 'ifHave').findOne();
    if (isRepeat) throw new Error('账号已存在！');

    if (insertData['id']) res = await db.update('user', insertData).where('id', insertData['id']).execute();
    else res = await db.insert('user', insertData).execute();
    if (!res.affectedRows) throw new Error('操作失败');
    await this.update(await db.select('*').from('user').where('id', insertData['id'] || res.insertId).findOne());
    return true;
  }

  async update(user) {
    // 更新缓存信息 
    await this.cache.set(`user-${user['id']}`, user, { ttl: 3600 * 24 });
  }

  async menuLst() {
    const user = this.app.user;
    const ids = await this.app.db.select('`keys`').from('role').where('id', user['roleId']).value();
    return await this.app.db.select('*').from('menu').where('isDel', 0).where('id', user.account === 'admin' ? '' : (ids || "-1"), 'in', 'ifHave').orderby('sort').find();
  }
}
