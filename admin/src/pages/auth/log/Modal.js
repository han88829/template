import { connect } from '@umijs/max';
import { ModalForm, ProForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
const App = ({ authLog: { data, visible }, dispatch, loading }) => {
  return (
    <ModalForm
      title={data.id ? '编辑公告' : '新建公告'}
      open={visible}
      width={500}
      initialValues={{ ...data }}
      autoFocusFirstInput
      autoComplete="off"
      modalProps={{
        destroyOnClose: true,
        onCancel: () => dispatch({ type: 'authLog/update', payload: { visible: false } }),
      }}
      onFinish={async (values) => {
        await dispatch({ type: 'authLog/save', payload: { ...data, ...values } });
      }}
    >
      <ProFormText
        name="title"
        label="标题"
        rules={[
          {
            required: true,
          },
        ]}
        placeholder="请输入标题"
      />
      <ProFormTextArea
        name="content"
        label="内容"
        rules={[
          {
            required: true,
          },
        ]}
        fieldProps={{
          autoSize: {
            minRows: 6,
          },
        }}
        placeholder="请输入内容"
      />
    </ModalForm>
  );
};

export default connect(({ authLog, loading }) => ({
  authLog,
  loading: loading.effects['authLog/save'],
}))(App);
