import { Modal, Input, Tree, Select } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';

const { Option } = Select;

const App = () => {
    const { visible, onClose, actionData, onSubmit, setActionData, authData } = useModel('role');
    const { data: deptLst, getData: getDeptLst } = useModel('department');
    useEffect(() => {
        if (!deptLst.length) getDeptLst();
    }, []);
    const onChange = (name, value) => {
        setActionData({ ...actionData, [name]: (value || "").trim() });
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
                        名称
                    </div>
                    <Input value={actionData.name} onChange={e => onChange('name', e.target.value)} className="form-item-value" />
                </div>
                <div className="form-item">
                    <div className="form-item-name">
                        部门组织权限
                    </div>
                    <Select value={actionData.deptIds} className="form-item-value"
                        mode='multiple'
                        onChange={v => {
                            setActionData({ ...actionData, deptIds: v })
                        }}
                    >
                        {
                            deptLst.map(x => {
                                return <Option key={x.id}>{x.name}</Option>
                            })
                        }
                    </Select>
                </div>
                <div className="form-item ">
                    <div className="form-item-name required">
                        菜单数据权限
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