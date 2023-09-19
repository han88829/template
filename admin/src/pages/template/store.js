import { create } from 'zustand';

const defaultParams = {
    page: 1,
    pageSize: 10,
    total: 0
};

export default create((set, get) => ({
    params: { ...defaultParams },
    list: [],
    visible: false,
    data: {},
    async getData() {
        set(() => ({ list: [] }))
    },
    async onDel(id) {
        set(() => ({ list: [] }))
    }
})) 