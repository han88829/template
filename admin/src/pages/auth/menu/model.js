
import { menuLst, menuSave, menuDel } from '@/services/auth';
import { getTreeMenu } from '@/utils';
import { message } from 'antd'

export const defaultData = {
    name: "",
    sort: 1,
    type: 1,
    icon: "",
    pid: 0,
    path: "",
    showMenu: 1,
};

export default {
    namespace: 'menu',
    state: {
        data: [],
        visible: false,
        actionData: { ...defaultData },
    },
    effects: {
        *query(_, { call, put }) {
            const res = yield call(menuLst);
            yield put({
                type: "update",
                payload: {
                    data: getTreeMenu(res.data || [])
                }
            })
        },
        *onSubmit({ payload: data }, { call, put }) {
            if (!data.name) return message.error('请输入节点名称！');
            if (data.type > 1 && !data.path) return message.error('请输入节点路由！');
            const res = yield call(menuSave, data);
            if (res.code == 200) {
                message.success('保存成功！');
                yield put({
                    type: "query"
                });
                yield put({
                    type: "update", payload: { visible: false }
                });
            }
        },
        * onShow(_, { put }) {
            yield put({
                type: "update", payload: { visible: true, actionData: { ...defaultData } }
            })
        },
        *onDel({ payload: id }, { put, call }) {
            const res = yield call(menuDel, { id });
            if (res.code == 200) {
                message.success('保存成功！');
                yield put({
                    type: "query"
                });
            }
        }
    },
    reducers: {
        update(state, action) {
            return {
                ...state,
                ...action.payload,
            }
        }
    },
}
