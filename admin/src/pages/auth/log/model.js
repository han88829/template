import { logLst } from '@/services/auth';
import { message } from 'antd';

export default {
  namespace: 'authLog',
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
      const res = yield call(logLst, payload);
      yield put({
        type: 'update',
        payload: {
          list: res?.data?.rows ?? [],
          params: { ...payload, total: res?.data?.total ?? 0 },
        },
      });
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
