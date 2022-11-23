import { useModel } from 'umi';
import { useEffect } from 'react';
import Search from './Search'
import Table from './Table'
import Modal from './Modal'
import './index.less';

function App() {
    const { getData, getAuthData } = useModel('role', ret => {
        return ({ getData: ret.getData, getAuthData: ret.getAuthData })
    })
    useEffect(() => {
        getData();
        getAuthData();
    }, []);
    return <div className="auth-user">
        <Search></Search>
        <Table />
        <Modal />
    </div>;
}

export default App;