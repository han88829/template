import { Modal, Form, Input, Select } from 'antd';
import React, { useEffect } from 'react';
import { useModel } from 'umi';

const { Option } = Select;

const App = () => {
    const { visible, onClose, actionData, onSubmit, setActionData } = useModel('authUser');
    const { data = [], getData } = useModel('role');
    const { data: deptLst, getData: getDeptLst } = useModel('department');
    useEffect(() => {
        if (!data.length) getData();
        if (!deptLst.length) getDeptLst();
    }, []);
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
                <div className="form-item">
                    <div className="form-item-name required">
                        账号
                    </div>
                    <Input value={actionData.account} disabled={actionData.id ? true : false} className="form-item-value" onChange={e => onChange('account', e.target.value)} />
                </div>
                <div className="form-item">
                    <div className={`form-item-name ${actionData.id ? '' : 'required'}`}>
                        密码
                    </div>
                    <Input value={actionData.password} type="password" className="form-item-value" onChange={e => onChange('password', e.target.value)} />
                </div>
                <div className="form-item">
                    <div className="form-item-name">
                        手机号
                    </div>
                    <Input value={actionData.mobile} className="form-item-value" onChange={e => onChange('mobile', e.target.value)} />
                </div>

                <div className="form-item">
                    <div className="form-item-name required">
                        角色
                    </div>
                    <Select value={`${actionData.roleId || ""}`} className="form-item-value" onChange={v => onChange('roleId', v)}>
                        {
                            data.map(x => {
                                return <Option key={x.id}>{x.name}</Option>
                            })
                        }
                    </Select>
                </div>
                <div className="form-item">
                    <div className="form-item-name required">
                        部门
                    </div>
                    <Select value={`${actionData.deptId}`} className="form-item-value"
                        onChange={v => {
                            setActionData({ ...actionData, deptId: v })
                        }}
                    >
                        {
                            deptLst.map(x => {
                                return <Option key={x.id}>{x.name}</Option>
                            })
                        }
                    </Select>
                </div>
            </Modal>
        </>
    );
};
export default App;