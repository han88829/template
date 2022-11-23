import { deptLst, deptDel, deptSave } from '@/services/auth';
import { message } from 'antd';

export default {
  namespace: 'template',
  state: {
    params: {
      page: 1,
      total: 0,
      pageSize: 10,
      name: '',
      channel: '',
    },
    visible: false,
    detailOpen: false,
    list: [],
    data: {},
  },
  effects: {
    *query({ payload }, { call, put }) {
      const res = yield call(deptLst, payload);
      yield put({
        type: 'update',
        payload: {
          list: [
            {
              id: 1,
              name: '模板',
            },
          ],
          params: { ...payload, total: 1 },
        },
      });
    },
    *del({ payload }, { call, put, select }) {
      return;
      const { code } = yield call(deptDel, { id: payload.id });
      const params = yield select((s) => s.message.params);
      if (code == 0) {
        message.success('删除成功！');
        yield put({
          type: 'query',
          payload: params,
        });
      }
    },
    *save({ payload: { type, ...data } }, { call, put, select }) {
      return;
      const { code } = yield call(deptSave, data);
      const params = yield select((s) => s.template.params);
      if (code == 0) {
        message.success('保存成功！');
        yield put({
          type: 'query',
          payload: params,
        });
        yield put({
          type: 'update',
          payload: {
            visible: false,
          },
        });
      }
    },
  },
  reducers: {
    update(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
