/**
 * @Author: eqian
 * @Date: 2024/4/15
 * @email: 2429120006@qq.com
 * @Description: cookie
*/
// @ts-ignore
import Cookie from 'js-cookie';

const TOKEN_KEY = '__TOKEN_KEY__';
const USER_ACCOUNT_KEY = '__USER_ACCOUNT_KEY__';
/**
 * 设置token
 * @param token
 */
export const useSetTokenCookie = (token: string) => {
  return Cookie.set(TOKEN_KEY, token);
};
/**
 * 获取token
 */
export const useGetTokenCookie = () => {
  return Cookie.get(TOKEN_KEY);
};
/**
 * 移除token
 */
export const useRemoveTokenCookie = () => {
  return Cookie.remove(TOKEN_KEY);
};

/**
 * 设置用户记住密码cookie
 * @param account
 * @param expires
 */
export const useSetAccountCookie = (account: string, expires: number = 3) => {
  return Cookie.set(USER_ACCOUNT_KEY, account, { expires });
};
/**
 * 获取用户账号cookie
 */
export const useGetAccountCookie = () => {
  return Cookie.get(USER_ACCOUNT_KEY);
};
/**
 * 移除用户记住密码cookie
 */
export const useRemoveAccountCookie = () => {
  return Cookie.remove(USER_ACCOUNT_KEY);
};
