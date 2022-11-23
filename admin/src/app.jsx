import { SettingDrawer } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
import { currentUser as queryCurrentUser } from './services/api';
import defaultSettings from '../config/defaultSettings';
import { message } from 'antd';
import { userMenuLst } from '@/services/auth';
import * as Icons from '@ant-design/icons';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
/** 获取用户信息比较慢的时候会展示一个 loading */

const getMenuData = (data, pid = 0) => {
  return data
    .filter((item) => item.pid === pid)
    .map((x) => {
      const Icon = Icons[x.icon];
      if (x.type == 1)
        return {
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

export const initialStateConfig = {
  loading: <PageLoading />,
};
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

export async function getInitialState() {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      const { data } = await userMenuLst();
      return { currentUser: msg.data, authInfo: data };
    } catch (error) {
      history.push(loginPath);
    }

    return undefined;
  }; // 如果不是登录页面，执行

  if (history.location.pathname !== loginPath) {
    const { currentUser, authInfo } = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      authInfo,
      settings: defaultSettings,
    };
  }

  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
} // ProLayout 支持的api https://procomponents.ant.design/components/layout

export const layout = ({ initialState, setInitialState, ...props }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    menu: {
      // 每当 initialState?.currentUser?.userid 发生修改时重新执行 request
      params: {
        userId: initialState?.currentUser?.id,
      },
      request: () => getMenuData(initialState.authInfo),
    },
    footerRender: () => null,
    onPageChange: () => {
      const { location } = history; // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({ ...preInitialState, settings }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};
const setTokenMiddleware = async (ctx, next) => {
  const token = localStorage.getItem('token');
  ctx.req.options.headers.Authorization = token;
  await next();
  const res = ctx.res;
  if (res.code != 200 && res.message && res.code != 403) message.error(res.message || '');
  if (res.code == 403 && location.pathname !== loginPath) {
    history.push(loginPath);
  }
};

export const request = {
  middlewares: [setTokenMiddleware],
};
// let routes = [];
// export const patchRoutes = props => {
//   const res = routes.filter(x => x.path && x.component).map(x => {
//     const component = x.component.replace(/.jsx/g, '').replace("./", '');
//     return {
//       path: x.path,
//       name: x.name,
//       component: require(`@/pages/${component}.jsx`).default,
//     }
//   });
//   props.routes[0].routes.unshift(...res)
//   console.log(props.routes);
//   return props.routes
// }

// export const render = async fn => {
//   const { data } = await userMenuLst();
//   routes = data;
//   fn();
// }
