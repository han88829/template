import { ProLayoutProps } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  "navTheme": "light",
  "colorPrimary": "#1890ff",
  "layout": "mix",
  "contentWidth": "Fluid",
  "fixedHeader": true,
  "fixSiderbar": true,
  "pwa": true,
  "logo": "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
  "token": {
    "sider": {
      "colorBgMenuItemSelected": "#e6f4ff",
      "colorTextMenuSelected": "#1677ff",
      "colorTextMenuItemHover": "#1677ff",
      "colorTextMenuActive": "#1677ff"
    },
    "header": {
      "colorBgHeader": "#292f33",
      "colorHeaderTitle": "#fff",
      "colorTextMenu": "#dfdfdf",
      "colorTextMenuActive": "#1677ff",
      "colorBgMenuItemSelected": "#22272b"
    }
  }
};

export default Settings;
