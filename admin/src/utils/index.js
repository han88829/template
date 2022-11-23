import { TreeSelect } from 'antd';
const { TreeNode } = TreeSelect;

export const getTreeMenu = (data, pid = 0) => {
    let res = data.filter(x => x.pid == pid).map(x => ({ ...x, children: getTreeMenu(data, x.id) }));
    return res;
}

export const getTreeNode = data => {
    return data.map(x => {
        return <TreeNode TreeNode value={x.id} title={x.name} key={x.id} >
            {x.children && getTreeNode(x.children)}
        </TreeNode>
    })
}

export const getTreeSelectData = (data, pid = 0) => {
    let res = data.filter(x => x.pid == pid).map(x => ({ key: x.id, title: x.name, children: getTreeSelectData(data, x.id) }));
    return res;
}