import { useModel, useAccess } from 'umi';
import { Table, Popconfirm, Space } from 'antd';

function App() {
    const access = useAccess();
    const { loading, data = [], onDeptDel, onShow } = useModel('department');
    const columns = [{
        title: '名称',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: '操作',
        dataIndex: 'action',
        render: (text, record) => (
            <Space size="middle">
                {access['/api/auth/deptDel'] && <Popconfirm
                    title="确定要删除吗?"
                    onConfirm={() => onDeptDel(record.id)}
                    okText="确定"
                    cancelText="取消"
                >
                    <a href="#">删除</a>
                </Popconfirm>}
                {access['/api/auth/deptSave'] && <a onClick={() => {
                    onShow(record)
                }}>编辑</a>}
            </Space>
        ),
    }];
    return <div className="auth-user-table">
        <Table columns={columns} dataSource={data} loading={loading}
            rowKey={r => r.id}
        />
    </div>;
}

export default App;