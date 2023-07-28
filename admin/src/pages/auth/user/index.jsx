import { useModel, useAccess } from '@umijs/max';
import Modal from './Modal';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Space, Popconfirm, Tag } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import './index.less';
import { useEffect, useRef } from 'react';

function App() {
  const { getData, getExtraData, deptData, roleData, data, onShow, params, onDisableUser } =
    useModel('authUser');

  useEffect(() => {
    getExtraData();
  }, []);
  const actionRef = useRef(null);
  const onValuesChange = (data) => {
    if (data.roleId || data.deptId) {
      actionRef?.current?.submit();
    }
  };
  const access = useAccess();
  const columns = [
    {
      title: '关键词',
      dataIndex: 'name',
      key: 'name',
      hideInTable: true,
    },
    {
      title: '序号',
      dataIndex: 'id',
      width: 80,
      hideInSearch: true,
      render: (d, r, i) => ~~((params.page - 1) * params.pageSize + i + 1),
    },
    {
      title: '人员姓名',
      dataIndex: 'name',
      key: 'name',
      hideInSearch: true,
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile',
      hideInSearch: true,
    },
    {
      title: '所属角色',
      dataIndex: 'roleId',
      key: 'roleId',
      valueType: 'select',
      initialValue: 'all',
      valueEnum: new Map([
        ['all', { text: '全部' }],
        ...roleData.map((x) => [x.id, { text: x.name }]),
      ]),
    },
    {
      title: '所属部门',
      dataIndex: 'deptId',
      key: 'deptId',
      valueType: 'select',
      initialValue: 'all',
      valueEnum: new Map([
        ['all', { text: '全部' }],
        ...deptData.map((x) => [x.id, { text: x.name }]),
      ]),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'action',
      hideInSearch: true,
      render: (text, record) => (
        <Space size="middle">
          {access['/api/auth/roleSave'] && record.account != 'admin' && (
            <a
              onClick={() => {
                onShow({
                  ...record,
                  password: '',
                  roleId: String(record.roleId || ''),
                  deptId: String(record.deptId || ''),
                });
              }}
            >
              修改
            </a>
          )}
          {access['/api/user/disableUser'] && record.account != 'admin' && (
            <Popconfirm
              title="确定要删除吗"
              description="删除后数据将不可还原，请谨慎操作！"
              onConfirm={() => onDisableUser(record.id)}
              okText="确定"
              cancelText="取消"
            >
              <a style={{ color: 'red' }}>删除</a>
            </Popconfirm>
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
        formRef={actionRef}
        form={{ onValuesChange }}
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
