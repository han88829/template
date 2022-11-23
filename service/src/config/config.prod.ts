// 配置 logger 文件的目录，logger 默认配置由框架提供
module.exports = {
    midwayLogger: {
        default: {
            dir: '/www/wwwlogs/permission',
            level: 'info',
            consoleLevel: 'info'
        }
    },
    client: { // 数据库存连接配置
        // host
        host: '127.0.0.1',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: '121212',
        // 数据库名
        database: 'template',
        charset: "utf8mb4",//制定字符集用于保存emoji
        dateStrings: true,
        timezone: "+08:00"
    },
}; 