import { connect } from 'umi';
import { ModalForm, ProForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
const App = ({ template: { data, visible }, dispatch, loading }) => {
  return (
    <ModalForm
      title={data.id ? '编辑公告' : '新建公告'}
      visible={visible}
      width={500}
      initialValues={{ ...data }}
      autoFocusFirstInput
      autoComplete="off"
      modalProps={{
        destroyOnClose: true,
        onCancel: () => dispatch({ type: 'template/update', payload: { visible: false } }),
      }}
      onFinish={async (values) => {
        await dispatch({ type: 'template/save', payload: { ...data, ...values } });
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

export default connect(({ template, loading }) => ({
  template,
  loading: loading.effects['template/save'],
}))(App);
