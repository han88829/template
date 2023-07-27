import { useModel, useAccess } from '@umijs/max';
import Modal from './Modal';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Space, Popconfirm, Tag } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import './index.less';

function App() {
  const { getData, data, onShow, params, onDisableUser, onDel } = useModel('authUser');
  const access = useAccess();
  const columns = [
    {
      title: '关键词',
      dataIndex: 'name',
      key: 'name',
      hideInTable: true,
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      hideInSearch: true,
    },
    {
      title: '账号',
      dataIndex: 'account',
      key: 'account',
      hideInSearch: true,
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
      hideInSearch: true,
    },
    {
      title: '部门',
      dataIndex: 'deptName',
      key: 'deptName',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'disable',
      key: 'disable',
      valueType: 'select',
      hideInSearch: true,
      valueEnum: { 1: '停用', 0: '正常' },
      render: (text, r) => {
        return (
          <Tag color={r.disable == 1 ? 'volcano' : 'geekblue'}>
            {r.disable == 1 ? '停用' : '正常'}
          </Tag>
        );
      },
    },

    {
      title: '操作',
      dataIndex: 'action',
      hideInSearch: true,
      render: (text, record) => (
        <Space size="middle">
          {access['/api/auth/roleSave'] && (
            <a
              onClick={() => {
                onShow(record);
              }}
            >
              编辑
            </a>
          )}
          {access['/api/user/disableUser'] && record.account != 'admin' && (
            <a
              onClick={() => {
                onDisableUser(record.id);
              }}
            >
              {record.disable ? '启用' : '停用'}
            </a>
          )}
        </Space>
      ),
    },
  ];
  return (
    <PageContainer>
      <ProTable
        pagination={{
          total: params.total,
          pageSize: 10,
        }}
        rowKey="id"
        headerTitle="用户列表"
        request={(params) =>
          getData({
            page: params.current,
            ...params,
          })
        }
        dataSource={data}
        columns={columns}
        rowSelection={false}
        toolBarRender={() => [
          access['/api/auth/roleSave'] ? (
            <Button
              key="button"
              icon={<PlusCircleOutlined />}
              type="primary"
              onClick={() => onShow()}
            >
              新增
            </Button>
          ) : null,
        ]}
        search={{
          defaultCollapsed: false,
          optionRender: (searchConfig, formProps, dom) => [...dom.reverse()],
        }}
      />
      <Modal />
    </PageContainer>
  );
}

export default App;
