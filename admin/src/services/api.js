import { request } from 'umi';

export async function login(body, options) {
  return request('/api/open/login', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function currentUser(params) {
  return request('/api/user/info', {
    method: 'GET',
    params,
  });
}
