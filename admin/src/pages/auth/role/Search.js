import { useModel, useAccess } from 'umi';
import { Input, Button } from 'antd';

function App() {
    const access = useAccess(); 
    const { params, setParams, getData, onShow } = useModel('role', ret => {
        return ({ setParams: ret.setParams, params: ret.params, getData: ret.getData, onShow: ret.onShow })
    })
    return <div className="auth-user-search">
        <div className="search-item">
            <div className="search-item-name">
                关键词
            </div>
            <Input
                placeholder="请输入关键词"
                className="search-item-actipn"
                value={params.name}
                allowClear
                onChange={e => setParams({ ...params, name: (e.target.value || "").trim() })}
            />
        </div>
        <Button type="primary" className="search-btn" onClick={e => {
            setParams({ ...params, page: 1 });
            getData();
        }}> 搜索</Button>
        {access['/api/auth/roleSave'] && <Button type="primary" className="search-btn" onClick={e => {
            onShow()
        }}> 新增</Button>}
    </div >;
}

export default App;