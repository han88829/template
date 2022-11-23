import { App, Body, Controller, Get, Inject, Post, Query } from '@midwayjs/decorator';
import { AuthService } from '../service/auth.service';

@Controller('/api/auth', { middleware: ['isLoginMiddleware', 'isAuthMiddleware'] })
export class AuthController {
  @App()
  app;

  @Inject()
  auth: AuthService;

  @Get('/deptLst')
  async deptLst(@Query('name') name: string) {
    return this.auth.deptLst(name);
  }

  @Post('/deptSave')
  async deptSave(@Body() data) {
    return this.auth.deptSave(data);
  }

  @Get('/deptDel')
  async deptDel(@Query('id') id: number) {
    return this.auth.deptDel(id);
  }

  @Get('/roleLst')
  async roleLst(@Query('name') name: string) {
    return this.auth.roleLst(name);
  }

  @Post('/roleSave')
  async roleSave(@Body() data) {
    return this.auth.roleSave(data);
  }

  @Get('/roleDel')
  async roleDel(@Query('id') id: number) {
    return this.auth.roleDel(id);
  }

  @Get('/menuLst')
  async menuLst() {
    return this.auth.menuLst();
  }

  @Post('/menuSave')
  async menuSave(@Body() data) {
    return this.auth.menuSave(data);
  }

  @Get('/menuDel')
  async menuDel(@Query('id') id) {
    return this.auth.menuDel(id);
  }
}
