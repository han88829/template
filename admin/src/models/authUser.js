import { useState } from 'react';
import { userLst, disableUser, userSave } from '@/services/auth';
import { message } from 'antd';
import { deptLst, roleLst } from '@/services/open';

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
    const [deptData, setDept] = useState([]);
    const [roleData, setRole] = useState([]);
    const [params, setParams] = useState({
        page: 1,
        total: 0,
        name: ""
    });
    const getData = async (data) => {
        setLoading(true);
        if (data.roleId === "all") data.roleId = '';
        if (data.deptId === "all") data.deptId = '';

        const res = await userLst({ ...params, ...data });
        setData(res?.data?.rows ?? []);
        setParams({ ...params, ...data, total: res?.data?.total ?? 0 });
        setLoading(false);
    }
    const getExtraData = async () => {
        const deptRes = await deptLst();
        const roleRes = await roleLst();
        setDept(deptRes.data || []);
        setRole(roleRes.data || []);
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
        setActionData(data || defaultData);
        setVisible(true);
    }
    const onClose = () => {
        setVisible(false);
        setActionData(defaultData);
    }
    const onSubmit = async (values) => {
        const { code } = await userSave(values);
        if (code == 200) {
            getData();
            onClose();
        }
    }
    return { data, getExtraData, deptData, roleData, saving, setData, onSubmit, setActionData, actionData, onClose, visible, onShow, onDisableUser, loading, params, setParams, getData };
};