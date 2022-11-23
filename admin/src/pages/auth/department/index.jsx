import { useModel } from 'umi';
import { useEffect } from 'react';
import Search from './Search'
import Table from './Table'
import Modal from './Modal'
import './index.less';

function App() {
    const { getData, list } = useModel('department', ret => {
        return ({ getData: ret.getData, list: ret.list })
    })
    useEffect(() => {
        getData();
    }, []);
    return <div className="auth-user">
        <Search></Search>
        <Table />
        <Modal />
    </div>;
}

export default App;