import { ModalForm, ProFormText, ProFormSelect } from '@ant-design/pro-components';
import React from 'react';
import { useModel } from '@umijs/max';

const App = () => {
    const { visible, onClose, deptData, roleData, actionData, onSubmit } = useModel('authUser');
    return (
        <ModalForm
            title={actionData.id ? '编辑' : '新增'}
            open={visible}
            width={500}
            initialValues={{ ...actionData }}
            autoFocusFirstInput
            autoComplete="off"
            modalProps={{
                destroyOnClose: true,
                onCancel: onClose,
            }}
            onFinish={async (values) => {
                await onSubmit({ ...actionData, ...values })
            }}
        >
            <ProFormText
                name="name"
                label="人员姓名"
                rules={[
                    {
                        required: true,
                    },
                ]}
                placeholder="请输入人员姓名"
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
                rules={actionData.id ? [] : [
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
                valueEnum={roleData.reduce((a, b) => ({ ...a, [b.id]: b.name }), {})}
            ></ProFormSelect>
            <ProFormSelect
                name="deptId"
                label="所属部门"
                rules={[{ required: true, }]}
                placeholder="请选择所属部门"
                valueEnum={deptData.reduce((a, b) => ({ ...a, [b.id]: b.name }), {})}
            ></ProFormSelect>
        </ModalForm>
    );
};
export default App;