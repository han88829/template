import { App, Config, Inject, Provide } from '@midwayjs/core';
import moment = require('moment');
import { IApp } from '../interface';
import * as OSS from 'ali-oss';
import { Tool } from '../utils/tool';
/**
 * 上传
 */
@Provide()
export class UploadService {
    @App()
    app: IApp;

    @Config('oss')
    oss;

    @Inject()
    tool: Tool;

    async upload(file) {
        const fileNames = file.filename.split('.');
        const fileName = fileNames[fileNames.length - 1];
        const name = this.tool.getNo(6, 'F');

        const client = new OSS({
            bucket: this.oss.bucket,
            // region以杭州为例（oss-cn-hangzhou），其他region按实际情况填写。
            region: this.oss.region,
            // 阿里云主账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM账号进行API访问或日常运维，请登录RAM控制台创建RAM账号。
            accessKeyId: this.oss.accessKeyId,
            accessKeySecret: this.oss.accessKeySecret,
            secure: true
        });

        const res = await client.put(
            `${moment().format('YYYY/MM/DD/')}${name}.${fileName}`,
            file.data
        );

        return res.url
    }
}