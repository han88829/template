import { ModalForm, ProFormText, ProForm } from '@ant-design/pro-components';
import store from './store';

const App = () => {
  const { visible, data, onSubmit } = store();
  return (
    <ModalForm
      title="修改密码"
      open={visible}
      width={500}
      initialValues={{ ...data }}
      autoFocusFirstInput
      autoComplete="off"
      modalProps={{
        destroyOnClose: true,
        onCancel: () => store.setState({ visible: false }),
      }}
      onFinish={async (values) => {
        await onSubmit({ ...data, ...values });
      }}
    >
      <ProFormText.Password
        name="oldPassword"
        label="原密码"
        rules={[
          {
            required: true,
          },
          {
            min: 6,
            message: '密码至少设置六位数',
          }
        ]}
        placeholder="请输入原密码"
      />
      <ProFormText.Password
        name="password"
        label="新密码"
        rules={[
          {
            required: true,
          },
          {
            min: 6,
            message: '密码至少设置六位数',
          }
        ]}
        placeholder="请输入新密码"
      />


      <ProForm.Item noStyle shouldUpdate>
        {(form) => {
          const password = form.getFieldValue('password');
          return (
            <ProFormText.Password
              name="confirmPassword"
              label="确认密码"
              placeholder="请输入确认密码"
              rules={[
                {
                  required: true,
                },
                {
                  min: 6,
                  message: '密码至少设置六位数',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (value != password) {
                      return Promise.reject(new Error('密码不一致，请重新输入!'));
                    }
                    return Promise.resolve();
                  },
                }),

              ]}
              fieldProps={{
                type: "password"
              }}
            />
          );
        }}
      </ProForm.Item>
    </ModalForm>
  );
};

export default App
