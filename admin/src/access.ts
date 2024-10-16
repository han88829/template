/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState) {
  const { authInfo = [], keys = [] } = initialState ?? {};
  const data = keys.reduce((a, b) => {
    return {
      ...a,
      [b.path]: !!authInfo.find((x) => x.path == b.path),
    };
  }, {});

  return {
    ...data,
  };
}
