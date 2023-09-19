import { create } from 'zustand';
import { editPwd } from '@/services/auth';
import { message } from 'antd';
import { loginOut } from './AvatarDropdown';

const defaultData = {
    oldPassword: "",
    password: "",
    confirmPassword: ""
};

export default create((set, get) => ({
    visible: false,
    data: { ...defaultData },
    async onSubmit(data) {
        const res = await editPwd(data);
        if (res?.code == 200) {
            message.success('修改成功！');
            set(() => ({
                visible: false,
            }))
            loginOut();
        }
    },
    showModal() {
        set(() => ({
            visible: true,
            data: { ...defaultData }
        }))
    }
})) 