import ava from '@/images/ava.png';
import { LogoutOutlined, FormOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Avatar, Spin } from 'antd';
import { stringify } from 'querystring';
import React from 'react';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import store from './store';
/**
 * 退出登录，并且将当前的 url 保存
 */
export const loginOut = async () => {
  const { query = {}, search, pathname } = history.location;
  const { redirect } = query; // Note: There may be security issues, please note
  localStorage.removeItem('token');
  if (window.location.pathname !== '/user/login' && !redirect) {
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: pathname + search,
      }),
    });
  }
};

const AvatarDropdown = () => {
  const showModal = store(s => s.showModal);
  const { initialState, setInitialState } = useModel('@@initialState');
  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.account) {
    return loading;
  }

  const menuHeaderDropdown = [
    {
      label: '修改密码',
      icon: <FormOutlined />,
      key: 'editPwd',
      onClick: () => {
        showModal()
      },
    },
    {
      type: 'divider',
    },
    {
      label: '退出登录',
      icon: <LogoutOutlined />,
      key: 'logout',
      onClick: () => {
        setInitialState((s: object) => ({ ...s, currentUser: undefined }));
        loginOut();
      },
    },
  ];
  return (
    <HeaderDropdown menu={{ items: menuHeaderDropdown }} placement="bottomRight">
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} src={currentUser.ava || ava} alt="avatar" />
        <span className={`${styles.name} anticon`}>{currentUser.name}</span>

      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
