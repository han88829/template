import { Space } from 'antd';
import React from 'react';
import { useModel } from '@umijs/max';
import Avatar from './AvatarDropdown';
import styles from './index.less';
import Modal from './Modal';

const GlobalHeaderRight = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <Space className={className}>
      <Avatar />
      <Modal></Modal>
    </Space>
  );
};

export default GlobalHeaderRight;
