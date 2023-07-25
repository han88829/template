/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: any) {
  const { authInfo = [] } = initialState ?? {};
  const data = authInfo.reduce((a: any, b: any) => {
    if (b.path) a[b.path] = true;
    return a
  }, {});
  return {
    ...data
  };
}
