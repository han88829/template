import { connect } from '@umijs/max';
import { useEffect } from 'react';
import Search from './Search';
import Table from './Table';
import Modal from './Modal';
import { PageContainer } from '@ant-design/pro-components';
import './index.less';

function App({ menu: { files }, dispatch }) {
  useEffect(() => {
    dispatch({ type: 'menu/query' });
  }, []);
  return (
    <PageContainer>
      <div className="menu">
        <Search></Search>
        <Table />
        <Modal />
      </div>
    </PageContainer>
  );
}

export default connect(({ menu }) => ({ menu }))(App);
