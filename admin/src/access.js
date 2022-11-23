/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState) {
  const { authInfo = [] } = initialState ?? {};
  const data = authInfo.reduce((a, b) => {
    if (b.path) a[b.path] = true;
    return a
  }, {});
  console.log(data);
  return {
    ...data
  };
}
