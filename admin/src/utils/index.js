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

export const getQueryString = (variable, query = window.location.search.substring(1)) => {
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] == variable) { return decodeURIComponent(pair[1]); }
    }
    return false;
}