import { connect } from '@umijs/max';
import { ModalForm, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
const App = ({ template: { data, visible }, dispatch, loading }) => {
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
      <ProFormText
        name="mobile"
        label="手机号"
        rules={[
          {
            required: true,
          }, {
            pattern: /^1\d{10}$/,
            message: '手机号格式错误！',
          }
        ]}
        placeholder="请输入手机号"
      />
      <ProFormText.Password
        name="password"
        label="密码"
        placeholder="请输入密码"
        rules={[
          {
            required: true,
          },
          {
            min: 6,
            message: '密码至少设置六位数',
          }
        ]}
        fieldProps={{
          type: "password"
        }}
      />
      <ProFormSelect
        name="roleId"
        label="所属角色"
        rules={[{ required: true, }]}
        placeholder="请选择所属角色"
        valueEnum={{ 1: "管理员" }}
      ></ProFormSelect>
    </ModalForm>
  );
};

export default connect(({ template, loading }) => ({
  template,
  loading: loading.effects['template/save'],
}))(App);
