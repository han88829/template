


import * as utils from './index';
let _HOST = "http://127.0.0.1:7001";
if (process.env.NODE_ENV !== "development") {
    _HOST = '';
}
export const HOST = _HOST;

const request = async ({
    url,
    data,
    loading = false,//是否显示加载提示 默认false
    method = "GET",//GET|POST
    mask = true,//加载提示透明蒙层不可点击 默认true不可点击，false不影响操作
    isVerify = true,//是否进行登录验证 默认true验证
}) => {
    let token = uni.getStorageSync("token");
    if (!token && isVerify) {
        // #ifdef MP-WEIXIN
        token = await login();
        // #endif 

        // #ifdef H5 
        uni.navigateTo({ url: '/pages/my/login' });
        return
        // #endif

    }

    if (loading) uni.showLoading({
        mask,
        title: loading
    });
    try {
        const res = await uni.request({
            url: `${HOST}${url}`,
            data,
            header: {
                'content-type': 'application/json',
                'Authorization': token
            },
            method: method,
        });
        uni.hideLoading();

        // 请求失败提示
        if (res.data.code != 200) {
            uni.showToast({
                title: res.data.message, icon: "none"
            });
        }

        // 未登录跳转
        if (res.data.code == 401) {
            uni.removeStorageSync('token');
            uni.navigateTo({
                url: '/pages/login/index'
            })
            return
        }

        return res.data;
    } catch (e) {
        console.log('网络请求错误！', e);
        uni.hideLoading();
        await utils.toast(e.message || e.errMsg || "请求错误");
        throw new Error(e);
    }
}
const login = async () => {
    try {
        // 获取加载的页面
        let pages = getCurrentPages(),
            // 获取当前页面的对象
            view = pages[pages.length - 1];
        let options = {};
        if (view && view.options) options = view.options;
        const [_, res] = await uni.login();
        const [__, { data }] = await uni.request({
            url: `${HOST}/wxLogin`,
            data: {
                ...options,
                code: res.code,
            },
        });
        if (data.code == 200) {
            uni.setStorageSync('token', data.data)
            return data.data;
        }
    } catch (e) {
        console.log('登录错误', e)
    }
}

export default request; 