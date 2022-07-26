import request from './request';

export function getCategory(data: any) {
  return request({
    url: '/process/process-category/select/list',
    method: 'post',
    data: {
      ...data,
    },
  }).then((res) => {
    return res.data.data;
  });
}

export function groupPage(data: any) {
  return request({
    url: '/system/rbac-role/select/page',
    method: 'post',
    data: {
      ...data,
    },
  }).then((res) => {
    return res.data.data;
  });
}

export function userPage(data: any) {
  return request({
    url: '/system/rbac-user/select/page',
    method: 'post',
    data: {
      ...data,
    },
  }).then((res) => {
    return res.data.data;
  });
}

export function expressionPage(data: any) {
  return request({
    url: '/process/design-expression/select/page',
    method: 'post',
    data: {
      ...data,
    },
  }).then((res) => {
    return res.data.data;
  });
}

export function orgTree(params: any) {
  return request({
    url: '/system/rbac-org/select/org-tree-list?type=0',
    method: 'get',
    params: { ...params },
  }).then((res) => {
    return res.data.data;
  });
}
