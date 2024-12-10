import { App, Config, Inject, Provide, Utils } from '@midwayjs/core';
import { Tool } from '../utils/tool';
import * as _ from 'lodash';
import { CacheManager } from '@midwayjs/cache';
import { LogService } from './log.service';
import moment = require('moment');
import { IApp } from '../interface';
import { EditPwdDTO } from '../dto/user';

@Provide()
export class UserService {
  @App()
  app: IApp;

  @Inject()
  tool: Tool;

  @Config('pageSize')
  pageSize;

  @Inject()
  cache: CacheManager;

  @Inject()
  log: LogService;

  async login(data) {
    const db = await this.app.db;
    const user = await db
      .select()
      .from('user')
      .where('mobile', data['account'])
      .where('isDel', 0)
      .findOne();
    if (!user) throw new Error('用户不存在！');

    const password = this.tool.md5(user['uid'] + data['password']);

    if (user['password'] !== password) throw new Error('密码错误！');
    const token = this.tool.encrypt({
      id: user['uid'],
      secret: this.tool.md5(user['uid'] + 'secret' + password),
    });

    // 保存用户信息到redis
    await this.cache.set(`user-${user['uid']}`, user, { ttl: 3600 * 24 });
    delete user.password;

    // 保存日志信息
    await this.log.insert(1, `登录管理后台 (IP:${this.tool.getReqIP()})`, user);
    return token;
  }

  async list(params) {
    const db = this.app.db;
    const data = await db
      .select()
      .from('user')
      ._where('name,account,mobile', 'keywords', params.name, 'ifHave')
      .where('isDel', 0)
      ._where('roleId', '', params.roleId, 'ifHave')
      ._where('deptId', '', params.deptId, 'ifHave')
      .orderby('id desc')
      .page(params.page, this.pageSize);
    return data;
  }

  async roleList() {
    const db = this.app.db;
    const data = await db
      .select('id,name')
      .from('role')
      .orderby('id desc')
      .find();
    return data;
  }

  async disableUser(id: number) {
    const db = this.app.db;
    const user = await db.select('*').from('user').where('id', id).findOne();
    if (!user) throw new Error(`用户不存在`);
    if (user['account'] === 'admin') throw new Error('不能停用管理员账号');

    const res = await db('user')
      .where('id', id)
      .update({
        isDel: 1,
        delTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      });

    if (!res) throw new Error('操作失败');
    await this.update({ ...user, isDel: 1 });
    // 保存日志信息
    await this.log.insert(2, `删除用户-${user.mobile}`);
    return true;
  }

  async userSave({ name, mobile, id, password, roleId, deptId, ...otherData }) {
    const db = this.app.db;
    const insertData = {
      name,
      account: mobile,
      mobile,
      id,
      password,
      roleId,
      deptId,
    };
    let res;
    if (insertData['id']) insertData['uid'] = otherData['uid'];
    else insertData['uid'] = Utils.randomUUID();

    // 查询账号名称是否重复
    const isRepeat = await db
      .select('id')
      .from('user')
      .where('mobile', mobile)
      ._where('id', '<>', id, 'ifHave')
      .findOne();
    if (isRepeat) throw new Error('手机号已存在！');

    if (insertData['password'])
      insertData['password'] = this.tool.md5(
        insertData['uid'] + insertData['password']
      );
    else delete insertData['password'];

    if (insertData['id'])
      res = await db('user').where('id', insertData['id']).update(insertData);
    else
      res = await db('user')
        .insert(insertData)
        .then(x => x[0]);
    if (!res) throw new Error('操作失败');

    const user = await db
      .select('*')
      .from('user')
      .where('id', insertData['id'] || res)
      .findOne();
    await this.update(user);
    // 保存日志信息
    await this.log.insert(
      2,
      insertData['id'] ? `编辑账户-${mobile}` : `新增账户-${mobile}`
    );

    return true;
  }

  async update(user) {
    // 更新缓存信息
    await this.cache.set(`user-${user['uid']}`, user, { ttl: 3600 * 24 });
  }

  async menuLst() {
    const user = this.app.user;
    const ids = await this.app.db
      .select('keys')
      .from('role')
      .where('id', user['roleId'])
      .value();
    return {
      data: await this.app.db
        .select('*')
        .from('menu')
        .where('isDel', 0)
        ._where(
          'id',
          'in',
          user.account === 'admin' ? '' : ids || '-1',
          'ifHave'
        )
        .orderby('sort')
        .find(),
      keys: await this.app.db
        .select('path')
        .from('menu')
        .where('isDel', 0)
        .orderby('sort')
        .find(),
    };
  }

  async editPwd(data: EditPwdDTO) {
    const user = await this.app.db
      .select()
      .from('user')
      .where('id', this.app.user.id)
      .findOne();
    const password = this.tool.md5(user['uid'] + data['oldPassword']);

    if (password != user.password) throw new Error('原密码错误');
    const newPassword: string = this.tool.md5(user['uid'] + data['password']);
    const res = await this.app
      .db('user')
      .where('id', user.id)
      .update({ password: newPassword });

    if (!res) throw new Error('密码修改失败！');
    await this.update({
      ...user,
      password: newPassword,
    });
    return true;
  }
}
