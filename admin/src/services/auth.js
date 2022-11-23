import { request } from 'umi';

export async function userLst(params) {
    return request('/api/user/list', {
        method: 'GET',
        params
    });
}

export async function disableUser(params) {
    return request('/api/user/disableUser', {
        method: 'GET',
        params
    });
}

export async function userMenuLst(params) {
    return request('/api/user/menuLst', {
        method: 'GET',
        params
    });
}

export async function userSave(data) {
    return request('/api/user/userSave', {
        method: 'POST',
        data
    });
}

export async function deptLst(params) {
    return request('/api/auth/deptLst', {
        method: 'GET',
        params
    });
}

export async function deptDel(params) {
    return request('/api/auth/deptDel', {
        method: 'GET',
        params
    });
}

export async function deptSave(data) {
    return request('/api/auth/deptSave', {
        method: 'POST',
        data
    });
}

export async function roleLst(params) {
    return request('/api/auth/roleLst', {
        method: 'GET',
        params
    });
}

export async function roleDel(params) {
    return request('/api/auth/roleDel', {
        method: 'GET',
        params
    });
}

export async function roleSave(data) {
    return request('/api/auth/roleSave', {
        method: 'POST',
        data
    });
}

export async function authDataLst() {
    return request('/api/user/authData');
}

export async function getAuthInfo() {
    return request('/api/user/authInfo');
}

export async function menuLst(params) {
    return request('/api/auth/menuLst', {
        method: 'GET',
        params
    });
}

export async function menuDel(params) {
    return request('/api/auth/menuDel', {
        method: 'GET',
        params
    });
}

export async function menuSave(data) {
    return request('/api/auth/menuSave', {
        method: 'POST',
        data
    });
}