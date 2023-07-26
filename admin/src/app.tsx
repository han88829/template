import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';
import { currentUser as queryCurrentUser } from './services/api';
import React from 'react';
import { userMenuLst } from '@/services/auth';
import RightContent from '@/components/RightContent';
import * as Icons from '@ant-design/icons';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

const baseUrl = isDev ? '' : '';

const ICONS: any = Icons;
const getMenuData = (data: any, pid = 0) => {
  return data
    .filter((item: any) => item.pid === pid)
    .map((x: any) => {
      const Icon = ICONS[x.icon];
      if (x.type == 1)
        return {
          path: x.path,
          name: x.name,
          icon: x.icon && <Icon />,
          hideInMenu: x.showMenu == 2,
          routes: getMenuData(data, x.id),
        };
      return {
        path: x.path,
        name: x.name,
        icon: x.icon && <Icon />,
        hideInMenu: x.showMenu == 2,
      };
    });
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<any> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      const { data } = await userMenuLst();
      return { currentUser: msg.data, authInfo: data };
    } catch (error) {
      // history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  const { location } = history;
  if (location.pathname !== loginPath) {
    const { currentUser, authInfo }: any = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      authInfo,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    rightContentRender: () => <RightContent />,
    // footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      console.log(location);

      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    layoutBgImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    menuHeaderRender: undefined,
    menu: {
      // 每当 initialState?.currentUser?.userid 发生修改时重新执行 request
      params: {
        userId: initialState?.currentUser?.id,
      },
      request: () => getMenuData(initialState.authInfo),
    },
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          <SettingDrawer
            disableUrlParams
            enableDarkTheme
            settings={initialState?.settings}
            onSettingChange={(settings) => {
              setInitialState((preInitialState) => ({
                ...preInitialState,
                settings,
              }));
            }}
          />
        </>
      );
    },
    ...initialState?.settings,
  };
};
/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,
  requestInterceptors: [
    (url: string, options: any) => {
      const token = localStorage.getItem('token');
      options.headers.Authorization = token;
      return { url: `${baseUrl}${url}`, options };
    },
  ],
};