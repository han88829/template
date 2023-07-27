import { useModel, useAccess } from '@umijs/max';
import Modal from './Modal';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Space, Popconfirm } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import './index.less';

function App() {
  const { getData, data, onShow, params, onDeptDel } = useModel('department');
  const access = useAccess();
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      hideInSearch: true,
    },
    {
      title: '关键词',
      dataIndex: 'name',
      key: 'name',
      hideInTable: true,
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
          {access['/api/auth/roleDel'] && (
            <Popconfirm
              title="确定要删除吗?"
              onConfirm={() => onDeptDel(record.id)}
              okText="确定"
              cancelText="取消"
            >
              <a href="#" style={{ color: 'red' }}>
                删除
              </a>
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
        rowKey="id"
        headerTitle="部门列表"
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
