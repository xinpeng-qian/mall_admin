/**
 * 获取应对应权限的名称地址
 */
const roleToRoute = {
  coustomer: [
    {
      name: 'Product',
    },
    {
      name: 'ProductList',
    },
    {
      name: 'ProductAdd',
    },
  ],
  admin: [
    {
      name: 'Product',
    },
    {
      name: 'ProductList',
    },
    {
      name: 'ProductAdd',
    },
    {
      name: 'Category',
    },
  ],
};

/**
 * 过滤掉没有路由的权限
 * @param {String} role 权限
 * @param {Array} routes 路由
 */
export default function getMenuRoutes(role, routes) {
  // 得到你的权限可以获取那些页面
  const allowRoutesName = roleToRoute[role].map((item) => item.name);
  // 得到本页权限的配置相同于路由页的配置地址
  const resultRoutes = routes.filter((a) => {
    const obj = a;
    // 可以去到的那些一级页面
    if (allowRoutesName.indexOf(obj.name) !== -1) {
      const { children } = obj;
      // 再筛选二级页面中有那些
      obj.children = children.filter((b) => allowRoutesName.indexOf(b.name !== -1));
      return true;
    }
    return false;
  });
  return resultRoutes; // 为筛选后合格地址的数组
}
