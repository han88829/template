import { Table, Popconfirm, Space } from 'antd';
import { connect, useAccess } from '@umijs/max';
import { defaultData } from './model'

function App({ menu: { data }, loading, dispatch }) {
    const access = useAccess();
    const columns = [{
        title: '名称',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        render: t => ({ 1: "目录", 2: "菜单", 3: "权限" }[t])
    }, {
        title: '路由',
        dataIndex: 'path',
        key: 'path',
    }, {
        title: '排序',
        dataIndex: 'sort',
        key: 'sort',
    }, {
        title: '操作',
        dataIndex: 'action',
        render: (text, record) => (
            <Space size="middle">
                {access['/api/auth/menuSave'] && <a onClick={() => {
                    dispatch({
                        type: "menu/update", payload: {
                            visible: true,
                            actionData: { ...defaultData, pid: record.id }
                        }
                    })
                }}>新增</a>}
                {access['/api/auth/menuSave'] && <a onClick={() => {
                    const { children, ...actionData } = record
                    dispatch({
                        type: "menu/update", payload: {
                            visible: true,
                            actionData: { ...actionData }
                        }
                    })
                }}>编辑</a>}
                {access['/api/auth/menuDel'] && <Popconfirm
                    title="确定要删除吗?"
                    onConfirm={() => dispatch({ type: "menu/onDel", payload: record.id })}
                    okText="确定"
                    cancelText="取消"
                >
                    <a href="#">删除</a>
                </Popconfirm>}
            </Space>
        ),
    }];
    return <div className="auth-user-table">
        <Table
            columns={columns}
            dataSource={data}
            loading={loading}
            rowKey={r => r.id}
        />
    </div>;
}

export default connect(
    ({ menu, loading }) => ({ menu, loading: loading.effects['menu/query'] })
)(App);