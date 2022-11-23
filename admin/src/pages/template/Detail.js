import { connect } from 'umi';
import { Modal, Descriptions } from 'antd';
const App = ({ template: { data, detailOpen }, dispatch }) => {
  return (
    <Modal
      title={false}
      visible={detailOpen}
      width={1000}
      footer={false}
      onCancel={() => dispatch({ type: 'template/update', payload: { detailOpen: false } })}
      onOk={() => dispatch({ type: 'template/update', payload: { detailOpen: false } })}
    >
      <Descriptions title="详情" bordered>
        <Descriptions.Item label="id" span={1}>
          {data.id || ''}
        </Descriptions.Item>
        <Descriptions.Item label="名称" span={2}>
          {data.name || ''}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default connect(({ template }) => ({ template }))(App);
