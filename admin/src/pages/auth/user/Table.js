import { useModel, useAccess } from 'umi';
import { Table, Tag, Space } from 'antd';

function App() {
    const access = useAccess();
    const { loading, data = {}, params, onDisableUser, onShow } = useModel('authUser');
    const columns = [{
        title: '名称',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: '账号',
        dataIndex: 'account',
        key: 'account',
    }, {
        title: '角色名称',
        dataIndex: 'roleName',
        key: 'roleName',
    }, {
        title: '部门',
        dataIndex: 'deptName',
        key: 'deptName',
    }, {
        title: '状态',
        dataIndex: 'disable',
        key: 'disable',
        render: text => {
            return <Tag color={text == 1 ? 'volcano' : 'geekblue'}  >
                {text == 1 ? '停用' : "正常"}
            </Tag>
        }
    }, {
        title: '操作',
        dataIndex: 'action',
        render: (text, record) => (
            <Space size="middle">
                {access['/api/user/disableUser'] && record.account != 'admin' && <a onClick={() => {
                    onDisableUser(record.id)
                }}>{record.disable ? '启用' : "停用"}</a>}
                {access['/api/user/userSave'] && <a onClick={() => {
                    onShow(record)
                }}>编辑</a>}
            </Space>
        ),
    }];
    return <div className="auth-user-table">
        <Table columns={columns} dataSource={data.rows} loading={loading}
            pagination={{
                current: params.page,
                pageSize: 20,
                total: data.total
            }}
            rowKey={r => r.id}
        />
    </div>;
}

export default App;