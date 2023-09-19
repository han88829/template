import { Space, Button, Popconfirm } from 'antd';
import ActionModal from './Modal';
import { PlusCircleOutlined } from '@ant-design/icons';
import { ProTable, PageContainer } from '@ant-design/pro-components';
import store from './store';

const App = () => {
  const { params, list, getData, onDel } = store();
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80,
      hideInSearch: true,
      render: (d, r, i) => ~~((params.page - 1) * params.pageSize + i + 1),
    },
    {
      title: '关键词',
      dataIndex: 'keyword',
      hideInTable: true,
    },
    {
      title: '名称',
      dataIndex: 'name',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      hideInSearch: true,
      render: (v, r, _, action) => (
        <Space>
          <a
            onClick={() => {
              dispatch({
                type: 'template/update',
                payload: {
                  data: { ...r, type: 'update' },
                  visible: true,
                },
              });
            }}
          >
            编辑
          </a>
          <Popconfirm
            title="确定要删除吗?"
            onConfirm={() => onDel(r.id)}
            okText="确定"
            cancelText="取消"
          >
            <a style={{ color: "red" }}>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer className="shop">
      <ProTable
        pagination={{
          total: params.total,
          pageSize: 10,
        }}
        rowKey="id"
        headerTitle="列表"
        request={(params) => getData({
          page: params.current,
          ...params,
        })}
        dataSource={list}
        columns={columns}
        rowSelection={false}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusCircleOutlined />}
            type="primary"
            onClick={() => {
              store.setState({
                visible: true,
                data: {
                  type: 'add',
                }
              });
            }}
          >
            新增
          </Button>,
        ]}
        search={{
          defaultCollapsed: false,
          optionRender: (searchConfig, formProps, dom) => [...dom.reverse()],
        }}
      />
      <ActionModal></ActionModal>
    </PageContainer>
  );
};
export default App;