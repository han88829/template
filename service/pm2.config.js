// 名称任意，按照个人习惯来
module.exports = {
    apps: [
        {
            name: 'permission', // 应用名称
            script: './bootstrap.js', // 启动文件地址
            cwd: './', // 当前工作路径
            watch: [
                // 监控变化的目录，一旦变化，自动重启
                './dist',
            ],
            ignore_watch: [
                // 忽视这些目录的变化
                'node_modules',
                'logs',
                'public',
            ],
            node_args: '--harmony', // node的启动模式
            // instances: "max",//进程数量 max最大 多进程时开启 
            // exec_mode: "cluster",//cluster 默认fork 多进程时开启
            env: {
                NODE_ENV: 'production', // 设置运行环境，此时process.env.NODE_ENV的值就是development
            },
            env_production: {
                NODE_ENV: 'production',
            },
            // out_file: './logs/out.log', // 普通日志路径
            // error_file: './logs/err.log', // 错误日志路径
            merge_logs: true,
            log_date_format: 'YYYY-MM-DD HH:mm Z',
        },
    ],
};
