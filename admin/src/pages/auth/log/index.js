import { connect } from '@umijs/max';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { moduleData } from '@/utils/cod';

const App = ({ authLog: { params, list }, dispatch }) => {
  const columns = [
    {
      title: '序号',
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
      title: '操作人',
      dataIndex: 'userName',
      hideInSearch: true,
    },
    {
      title: '操作时间',
      dataIndex: 'createTime',
      hideInSearch: true,
      valueType: "dateTime"
    },
    {
      title: '功能模块',
      dataIndex: 'type',
      valueType: "select",
      valueEnum: moduleData
    },
    {
      title: '操作时间',
      dataIndex: 'createTime',
      hideInTable: true,
      valueType: "dateTimeRange"
    },
    {
      title: '日志内容',
      dataIndex: 'content',
      hideInSearch: true,
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
        headerTitle="日志管理"
        request={(params) => {
          console.log(params);
          dispatch({
            type: 'authLog/query',
            payload: {
              page: params.current,
              startTime: params?.createTime?.[0] ?? '',
              endTime: params?.createTime?.[1] ?? '',
              ...params,
            },
          })
        }}
        dataSource={list}
        columns={columns}
        rowSelection={false}
        toolBarRender={() => []}
        search={{
          defaultCollapsed: false,
          optionRender: (searchConfig, formProps, dom) => [...dom.reverse()],
        }}
      />
    </PageContainer>
  );
};

export default connect(({ authLog, loading }) => ({
  authLog,
  loading: loading.effects['authLog/save'],
}))(App);
