import { useModel } from 'umi';
import { useEffect } from 'react';
import Search from './Search';
import Table from './Table';
import Modal from './Modal';
import { PageContainer } from '@ant-design/pro-components';
import './index.less';

function App() {
  const { getData, getAuthData } = useModel('role', (ret) => {
    return { getData: ret.getData, getAuthData: ret.getAuthData };
  });
  useEffect(() => {
    getData();
    getAuthData();
  }, []);
  return (
    <PageContainer>
      <div className="auth-user">
        <Search></Search>
        <Table />
        <Modal />
      </div>
    </PageContainer>
  );
}

export default App;
