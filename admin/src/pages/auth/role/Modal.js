import { Modal, Tree, Select } from 'antd';
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

    // 将部门列表转换为扁平结构的选项
    const formatDeptOptions = (list, options = []) => {
        list.forEach(item => {
            options.push({
                label: item.name,
                value: item.id
            });
            if (item.children && item.children.length) {
                formatDeptOptions(item.children, options);
            }
        });
        return options;
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
                    <Input placeholder="请输入角色名称" value={actionData.name} onChange={e => onChange('name', e.target.value)} className="form-item-value" />
                </div>
                <div className="form-item ">
                    <div className="form-item-name">
                        角色描述
                    </div>
                    <Input placeholder="请输入角色描述" value={actionData.describe} onChange={e => onChange('describe', e.target.value)} className="form-item-value" />
                </div>
                <div className="form-item ">
                    <div className="form-item-name">
                        数据权限
                    </div>
                    <Select
                        className="form-item-value"
                        mode="multiple"
                        placeholder="请选择部门"
                        style={{ width: '100%' }}
                        value={actionData.deptIds || []}
                        onChange={value => onChange('deptIds', value)}
                        options={formatDeptOptions(deptLst)}
                        optionFilterProp="label"
                    />
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