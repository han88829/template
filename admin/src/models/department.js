import { useState } from 'react';
import { deptLst, deptDel, deptSave } from '@/services/auth'
import { message } from 'antd'

const defaultData = {
    name: "",
    account: "",
    mobile: "",
    roleId: "",
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
        const res = await deptLst(data);
        setData(res.data || []);
        setLoading(false);
        setParams({ ...data, total: res.data.length })
    }
    /**
     * @description: 停用账号
     * @param {*} id 用户id
     * @return {*}
     */
    const onDeptDel = async id => {
        setLoading(true);
        const { code } = await deptDel({ id });
        setLoading(false);
        if (code == 200) {
            message.success('删除成功！');
            getData();
        }
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
        setSaving(true);
        const { code } = await deptSave(actionData);
        if (code == 200) {
            getData();
            onClose();
        }
        setSaving(false);
    }
    return { data, saving, setData, onSubmit, setActionData, actionData, onClose, visible, onShow, onDeptDel, loading, params, setParams, getData };
};