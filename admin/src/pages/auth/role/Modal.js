import { Modal, Tree } from 'antd';
import { useEffect } from 'react';
import { useModel } from '@umijs/max';
import Input from '@/components/Input';

const App = () => {
    const { visible, onClose, actionData, onSubmit, setActionData, authData } = useModel('role');
    const { data: deptLst, getData: getDeptLst } = useModel('department');
    useEffect(() => {
        if (!deptLst.length) getDeptLst();
    }, []);
    const onChange = (name, value) => {
        setActionData({ ...actionData, [name]: value });
    }

    return (
        <>
            <Modal
                className="auth-user-modal auth-role-modal"
                title={!actionData.id ? '新增' : "编辑"}
                open={visible}
                onCancel={onClose}
                onOk={onSubmit}
            >
                <div className="form-item ">
                    <div className="form-item-name required">
                        角色名称
                    </div>
                    <Input placeHolder="请输入角色名称" value={actionData.name} onChange={e => onChange('name', e.target.value)} className="form-item-value" />
                </div> 
                <div className="form-item ">
                    <div className="form-item-name required">
                        权限配置
                    </div>
                    <Tree
                        checkable
                        autoExpandParent
                        checkStrictly
                        defaultExpandAll
                        checkedKeys={actionData.keys}
                        onCheck={v => {
                            setActionData({ ...actionData, keys: v.checked })
                        }}
                        treeData={authData}
                    />
                </div>
            </Modal>
        </>
    );
};
export default App;