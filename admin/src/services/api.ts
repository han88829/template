import { request } from '@umijs/max';

export async function login(body: any, options: any) {
  return request('/api/open/login', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function currentUser() {
  return request('/api/user/info', {
    method: 'GET',
  });
}
