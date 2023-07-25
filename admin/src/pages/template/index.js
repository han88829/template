import { Space, Button, Popconfirm } from 'antd';
import { connect } from 'umi';
import ActionModal from './Modal';
import { PlusCircleOutlined } from '@ant-design/icons';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import Detail from './Detail';

const App = ({ template: { params, list }, dispatch }) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80,
      hideInSearch: true,
      render: (d, r, i) => params.total - (params.page - 1) * params.pageSize - i,
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
                  data: r,
                  detailOpen: true,
                },
              });
            }}
          >
            查看详情
          </a>
          <a
            onClick={() => {
              dispatch({
                type: 'template/update',
                payload: {
                  data: { ...r, password: '', type: 'update' },
                  visible: true,
                },
              });
            }}
          >
            编辑
          </a>
          <Popconfirm
            title="确定要删除吗?"
            onConfirm={() =>
              dispatch({
                type: 'template/del',
                payload: r,
              })
            }
            okText="确定"
            cancelText="取消"
          >
            <a>删除</a>
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
          pageSize: 15,
        }}
        rowKey="id"
        headerTitle="列表"
        request={(params) =>
          dispatch({
            type: 'template/query',
            payload: {
              page: params.current,
              ...params,
            },
          })
        }
        dataSource={list}
        columns={columns}
        rowSelection={false}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusCircleOutlined />}
            type="primary"
            onClick={() => {
              dispatch({
                type: 'template/update',
                payload: {
                  visible: true,
                  data: {
                    type: 'add',
                    name: '',
                    account: '',
                    password: '',
                    mobile: '',
                  },
                },
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
      <Detail></Detail>
    </PageContainer>
  );
};

export default connect(({ template, loading }) => ({
  template,
  loading: loading.effects['template/save'],
}))(App);
