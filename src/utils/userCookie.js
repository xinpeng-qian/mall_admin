import Cookies from 'js-cookie';

/**
 * 所有数据添加 cookie 值
 * @param {Object} info
 */
export function setCookie(info) {
  const arr = Object.entries(info); // 对象数据转为数组展示
  for (let i = 0; i < arr.length; i += 1) {
    Cookies.set(arr[i][0], arr[i][1]);
  }
  return true;
}

/**
 * 获取已知用户的 cookie 信息
 */
export function getUserCookie() {
  return {
    username: Cookies.get('username'),
    appkey: Cookies.get('appkey'),
    role: Cookies.get('role'),
    email: Cookies.get('email'),
  };
}

/**
 * 移除用户的 cookie
 */
export function removeUserCookie() {
  Cookies.remove('username');
  Cookies.remove('appkey');
  Cookies.remove('role');
  Cookies.remove('email');
  return true;
}
