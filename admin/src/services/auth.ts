import { request } from '@umijs/max';

export async function userLst(params: any) {
    return request('/api/user/list', {
        method: 'GET',
        params
    });
}

export async function disableUser(params: any) {
    return request('/api/user/disableUser', {
        method: 'GET',
        params
    });
}

export async function userMenuLst() {
    return request('/api/user/menuLst', {
        method: 'GET',
    });
}

export async function userSave(data: any) {
    return request('/api/user/userSave', {
        method: 'POST',
        data
    });
}

export async function deptLst(params: any) {
    return request('/api/auth/deptLst', {
        method: 'GET',
        params
    });
}

export async function deptDel(params: any) {
    return request('/api/auth/deptDel', {
        method: 'GET',
        params
    });
}

export async function deptSave(data: any) {
    return request('/api/auth/deptSave', {
        method: 'POST',
        data
    });
}

export async function roleLst(params: any) {
    return request('/api/auth/roleLst', {
        method: 'GET',
        params
    });
}

export async function roleDel(params: any) {
    return request('/api/auth/roleDel', {
        method: 'GET',
        params
    });
}

export async function roleSave(data: any) {
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

export async function menuLst(params: any) {
    return request('/api/auth/menuLst', {
        method: 'GET',
        params
    });
}

export async function menuDel(params: any) {
    return request('/api/auth/menuDel', {
        method: 'GET',
        params
    });
}

export async function menuSave(data: any) {
    return request('/api/auth/menuSave', {
        method: 'POST',
        data
    });
}

export async function logLst(params: any) {
    return request('/api/auth/logLst', {
        method: 'GET',
        params
    });
}
