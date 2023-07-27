import { useState } from 'react';
import { userLst, disableUser, userSave } from '@/services/auth'
import { message } from 'antd'

const defaultData = {
    name: "",
    account: "",
    mobile: "",
    roleId: null,
    deptId: "",
    password: ""
};

export default () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [actionData, setActionData] = useState(defaultData);
    const [saving, setSaving] = useState(false);
    const [params, setParams] = useState({
        page: 1,
        total: 0,
        name: ""
    });
    const getData = async (data) => {
        setLoading(true);
        const res = await userLst(data);
        setData(res.data.rows || []);
        setParams({ ...data, total: res?.data?.total ?? 0 });
        setLoading(false);
    }
    /**
     * @description: 停用账号
     * @param {*} id 用户id
     * @return {*}
     */
    const onDisableUser = async id => {
        setLoading(true);
        const { code } = await disableUser({ id });
        setLoading(false);
        if (code == 200) getData();
    }

    const onShow = (data) => {
        setVisible(true);
        setActionData(data || defaultData);
    }
    const onClose = () => {
        setVisible(false);
        setActionData(defaultData);
    }
    const onSubmit = async () => {
        if (!actionData.name) return message.error('请填写名称');
        if (!actionData.account) return message.error('请填写账号');
        if (!actionData.password && !actionData.id) return message.error('请填写密码');
        if (!actionData.roleId) return message.error('请选择角色');
        if (!actionData.deptId) return message.error('请选择部门');
        setSaving(true);
        const { code } = await userSave(actionData);
        if (code == 200) {
            getData();
            onClose();
        }
        setSaving(false);
    }
    return { data, saving, setData, onSubmit, setActionData, actionData, onClose, visible, onShow, onDisableUser, loading, params, setParams, getData };
};