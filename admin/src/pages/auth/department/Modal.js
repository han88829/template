import { Modal, Input } from 'antd';
import React from 'react';
import { useModel } from 'umi';

const App = () => {
    const { visible, onClose, actionData, onSubmit, setActionData } = useModel('department');
    const onChange = (name, value) => {
        setActionData({ ...actionData, [name]: (value || "").trim() })
    }
    return (
        <>
            <Modal
                className="auth-user-modal"
                title={!actionData.id ? '新增' : "编辑"}
                visible={visible}
                onCancel={onClose}
                onOk={onSubmit}
            >
                <div className="form-item ">
                    <div className="form-item-name required">
                        名称
                    </div>
                    <Input value={actionData.name} onChange={e => onChange('name', e.target.value)} className="form-item-value" />
                </div>
            </Modal>
        </>
    );
};
export default App;