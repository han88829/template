import { Modal, Input, Radio, TreeSelect, InputNumber, Switch } from 'antd';
import { connect } from 'umi';
import { getTreeNode } from '@/utils'

const App = ({ menu: { actionData, visible, data }, dispatch, loading }) => {
    const onClose = () => {
        dispatch({
            type: "menu/update", payload: { visible: false }
        })
    }
    const onChange = (name, value = "") => {
        dispatch({
            type: "menu/update", payload: { actionData: { ...actionData, [name]: value } }
        })
    }
    return (
        <>
            <Modal
                className="auth-user-modal auth-role-modal"
                title={!actionData.id ? '新增' : "编辑"}
                open={visible}
                onCancel={onClose}
                width={800}
                confirmLoading={loading}
                onOk={() => dispatch({
                    type: "menu/onSubmit", payload: actionData
                })}
            >
                <div className="form-item ">
                    <div className="form-item-name">
                        节点类型
                    </div>
                    <Radio.Group className="form-item-value" value={actionData.type} onChange={e => onChange('type', e.target.value)}>
                        <Radio value={1}>目录</Radio>
                        <Radio value={2}>菜单</Radio>
                        <Radio value={3}>权限</Radio>
                    </Radio.Group>
                </div>
                <div className="form-item ">
                    <div className="form-item-name required">
                        节点名称
                    </div>
                    <Input value={actionData.name} onChange={e => onChange('name', e.target.value)} className="form-item-value" />
                </div>
                <div className="form-item ">
                    <div className="form-item-name">
                        父级菜单
                    </div>
                    <TreeSelect
                        showSearch
                        style={{ width: '100%' }}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        placeholder="请选择"
                        className="form-item-value"
                        treeDefaultExpandAll
                        allowClear
                        onChange={v => onChange('pid', v || 0)}
                        value={actionData.pid || null}
                    >
                        {getTreeNode(data)}
                    </TreeSelect>
                </div>
                {actionData.type < 3 && <div className="form-item ">
                    <div className="form-item-name">
                        是否菜单显示
                    </div>
                    <Switch checked={actionData.showMenu == 1} onChange={v => onChange('showMenu', v ? 1 : 2)} />
                </div>}
                <div className="form-item ">
                    <div className={`form-item-name required `}>
                        路由
                    </div>
                    <Input value={actionData.path} onChange={e => onChange('path', e.target.value)} className="form-item-value" />
                </div>
                {actionData.type != 3 && <div className="form-item ">
                    <div className="form-item-name">
                        节点图标
                    </div>
                    <Input value={actionData.icon} onChange={e => onChange('icon', e.target.value)} className="form-item-value" />
                </div>}
                <div className="form-item ">
                    <div className="form-item-name">
                        排序
                    </div>
                    <InputNumber value={actionData.sort} min={0} onChange={v => onChange('sort', v)} className="form-item-value" />
                </div>
            </Modal>
        </>
    );
};
export default connect(
    ({ menu, loading }) => ({ menu, loading: loading.effects['menu/onSubmit'] })
)(App);