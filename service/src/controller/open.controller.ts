import { App, Body, Controller, Inject, Post, File, Get, Query } from '@midwayjs/core';
import { UserService } from '../service/user.service';
import { Tool } from '../utils/tool';
import { IApp } from '../interface';
import { HttpService } from '@midwayjs/axios';
import { Context } from 'koa';
import { UploadService } from '../service/upload.service';

@Controller('/api/open')
export class OpenController {

  @Inject()
  ctx: Context;

  @App()
  app: IApp;

  @Inject()
  user: UserService;

  @Inject()
  tool: Tool;

  @Inject()
  logger;

  @Inject()
  axios: HttpService;

  @Inject()
  UploadService: UploadService;

  @Post('/login')
  async login(@Body() data): Promise<any> {
    return await this.user.login(data);
  }

  @Get('/deptLst', { middleware: ['isLoginMiddleware'] })
  async deptLst(@Query('keyword') keyword) {
    const db = this.app.db;
    return db.select('id,name').from('department')
      .where('name', keyword, 'like', 'ifHave')
      .where('isDel', 0)
      .find();
  }

  @Get('/roleLst', { middleware: ['isLoginMiddleware'] })
  async roleLst(@Query('keyword') keyword) {
    const db = this.app.db;
    return db.select('id,name').from('role')
      .where('name,describe', keyword, 'like', 'ifHave')
      .where('isDel', 0)
      .find();
  }

  @Post('/upload', { middleware: ['isLoginMiddleware'] })
  async upload(@File() file) {
    return this.UploadService.upload(file);
  }

  @Get('/test')
  async test() {
    const { data } = await this.axios.get('http://www.baidu.com');
    this.ctx.isCustom = true;
    this.ctx.response.header['content-type'] = 'text/html';
    return data;
  }
}
