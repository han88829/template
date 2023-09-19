import { App, Body, Controller, Get, Inject, Post, Query } from '@midwayjs/core';
import { UserService } from '../service/user.service';
import { Tool } from '../utils/tool';
import { EditPwdDTO } from '../dto/user';

@Controller('/api/user', { middleware: ['isLoginMiddleware'] })
export class UserController {
  @App()
  app;

  @Inject()
  user: UserService;

  @Inject()
  tool: Tool;

  @Get('/info')
  async info(): Promise<any> {
    return this.app.user;
  }

  @Get('/menuLst')
  async menuLst() {
    return this.user.menuLst();
  }

  @Get('/authInfo')
  async authInfo(): Promise<any> {
    let keys: any = await this.app.db.select("`keys`").from('role').where('id', this.app.user.roleId).value();
    const data = await this.app.db.select('url').from('menu').where('type', 3).where('id', 'in', keys).find();
    return data.reduce((a, b) => {
      return {
        ...a,
        [b.url]: true
      }
    }, {});
  }

  @Get('/list', { middleware: ['isAuthMiddleware'] })
  async list(@Query() params) {
    return await this.user.list(params);
  }

  @Get('/roleList', { middleware: ['isAuthMiddleware'] })
  async roleList() {
    return await this.user.roleList();
  }

  @Get('/disableUser', { middleware: ['isAuthMiddleware'] })
  async disableUser(@Query('id') id) {
    return await this.user.disableUser(id);
  }

  @Post('/userSave', { middleware: ['isAuthMiddleware'] })
  async userSave(@Body() data) {
    return await this.user.userSave(data);
  }

  @Post('/editPwd')
  async editPwd(@Body() data: EditPwdDTO) {
    return await this.user.editPwd(data);
  }

}
