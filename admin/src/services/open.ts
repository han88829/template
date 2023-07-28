import { request } from '@umijs/max';

export async function deptLst(keyword?: string) {
  return request('/api/open/deptLst', {
    params: { keyword }
  });
}

export async function roleLst(keyword?: string) {
  return request('/api/open/roleLst', {
    params: { keyword }
  });
}
