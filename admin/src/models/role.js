import { useState } from 'react';
import { roleLst, roleDel, roleSave, menuLst } from '@/services/auth';
import { message } from 'antd';
import { getTreeSelectData } from '@/utils';
import _ from 'lodash';

const defaultData = {
  name: '',
  describe: "",
  keys: [],
  deptIds: [],
};

export default () => {
  const [data, setData] = useState([]);
  const [authData, setAuthData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [actionData, setActionData] = useState(defaultData);
  const [saving, setSaving] = useState(false);
  const [params, setParams] = useState({
    page: 1,
    total: 0,
    name: '',
  });
  const getData = async (data) => {
    setLoading(true);
    const res = await roleLst({ ...params, ...data });
    setData(res.data || []);
    setParams({ ...params, ...data, total: res.data.length })
    setLoading(false);
  };
  const getAuthData = async () => {
    const { data = [] } = await menuLst();
    setAuthData(getTreeSelectData(data));
  };
  /**
   * @description: 停用账号
   * @param {*} id 用户id
   * @return {*}
   */
  const onDel = async (id) => {
    setLoading(true);
    const { code } = await roleDel({ id });
    setLoading(false);
    if (code == 200) getData();
  };

  const onShow = (data) => {
    setVisible(true);
    if (data && !_.isArray(data.keys))
      data.keys = (data.keys || '')
        .split(',')
        .filter((x) => x)
        .map((x) => ~~x);
    if (data)
      data.deptIds = (data.deptIds || '')
        .split(',')
        .filter((x) => x)
        .map((x) => ~~x);
    setActionData(data || defaultData);
  };
  const onClose = () => {
    setVisible(false);
    setActionData(defaultData);
  };
  const onSubmit = async () => {
    console.log(actionData);
    if (!actionData.name) return message.error('请填写名称');
    setSaving(true);
    const { code } = await roleSave(actionData);
    if (code == 200) {
      getData();
      onClose();
    }
    setSaving(false);
  };
  return {
    data,
    saving,
    getAuthData,
    authData,
    setData,
    onSubmit,
    setActionData,
    actionData,
    onClose,
    visible,
    onShow,
    onDel,
    loading,
    params,
    setParams,
    getData,
  };
};
