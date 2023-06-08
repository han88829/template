import { Config, Inject, Provide, Scope, ScopeEnum } from '@midwayjs/core';
import { Context } from 'koa';
import * as _ from 'lodash';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
/**
 * 帮助类
 */
@Provide()
@Scope(ScopeEnum.Request, { allowDowngrade: true })
export class Tool {
  @Inject()
  ctx: Context;

  @Config('keys')
  key;

  /**
   * 获得请求IP
   */
  async getReqIP() {
    const req = this.ctx.req;
    return (
      req.headers['x-forwarded-for'] ||
      req.socket.remoteAddress.replace('::ffff:', '')
    );
  }

  /**
   * 去除对象的空值属性
   * @param obj
   */
  async removeEmptyP(obj) {
    Object.keys(obj).forEach(key => {
      if (obj[key] === null || obj[key] === '' || obj[key] === 'undefined') {
        delete obj[key];
      }
    });
  }

  /**
   * 线程阻塞毫秒数
   * @param ms
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // 微信内容解密
  wxDecryptData({ encryptedData, iv, sessionKey }) {
    try {
      // base64 decode
      var _sessionKey = Buffer.from(sessionKey, 'base64')
      encryptedData = Buffer.from(encryptedData, 'base64')
      iv = Buffer.from(iv, 'base64')

      // 解密
      var decipher = crypto.createDecipheriv('aes-128-cbc', _sessionKey, iv)
      // 设置自动 padding 为 true，删除填充补位
      decipher.setAutoPadding(true)
      var decoded = decipher.update(encryptedData, 'binary', 'utf8')
      decoded += decipher.final('utf8')

      decoded = JSON.parse(decoded);

    } catch (err) {
      console.error(err);
      throw new Error('解密失败，请检查code是否更新！')
    }

    return decoded
  }

  randomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678oOLl9gqVvUuI1';
    var maxPos = $chars.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  }
  randomNum(len?) {
    len = len || 4;
    var $chars = '012356789';
    var maxPos = $chars.length;
    var res = '';
    for (var i = 0; i < len; i++) {
      res += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return res;
  }
  getNo(length: number = 6, prefix = "S") {
    const now = new Date();
    let year = now.getFullYear().toString();
    let month = (now.getMonth() + 1).toString();
    let day = now.getDate().toString();
    let hour = now.getHours().toString();
    let minutes = now.getMinutes().toString();
    let seconds = now.getSeconds().toString();
    // 存放订单号
    let num = '';
    // N位随机数(加在时间戳后面)
    for (let i = 0; i < length; i++) {
      num += Math.floor(Math.random() * 10);
    }
    return `${prefix}${year + month + day + hour + minutes + seconds + num}`;
  }

  encrypt(data, exp = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30)) {
    return jwt.sign({
      exp,
      data
    }, this.key);
  }

  decrypt(token) {
    try {
      const { data } = jwt.verify(token, this.key);
      return data;
    } catch (error) {
      throw new Error('秘钥错误或已过期！');
    }
  }

  md5(str: string) {
    let hash = crypto.createHash('md5');
    return hash.update(str + this.key).digest('base64');
  }
  getAllAuthKey(data, key = 'key') {
    if (_.isArray(data)) return data.reduce((a, b) => {
      let res = [b[key]];
      if (b.children) res.push(...this.getAllAuthKey(b.children))
      return [...a, ...res]
    }, [])
    return data[key]
  }
}
