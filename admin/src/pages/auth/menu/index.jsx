import { connect } from 'umi';
import { useEffect } from 'react'
import Search from './Search'
import Table from './Table'
import Modal from './Modal'
import './index.less';

function App({ menu: { files }, dispatch }) {
    useEffect(() => {
        dispatch({ type: "menu/query" })
    }, [])
    return (<div className='menu'>
        <Search></Search>
        <Table />
        <Modal />
    </div>)

}

export default connect(
    ({ menu }) => ({ menu })
)(App);