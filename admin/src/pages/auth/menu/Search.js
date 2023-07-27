
import { Button } from 'antd';
import { connect, useAccess } from '@umijs/max';

function App({ dispatch }) {
    const access = useAccess();
    return <div className="auth-user-search">
        <Button type="primary" className="search-btn" onClick={e => {
            dispatch({
                type: "menu/query"
            })
        }}> 刷新</Button>
        {access['/api/auth/menuSave'] && <Button type="primary" className="search-btn" onClick={e => {
            dispatch({
                type: "menu/onShow",
            })
        }}> 新增</Button>}
    </div >;
}

export default connect(
    ({ menu }) => ({ menu })
)(App);