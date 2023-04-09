import Cookies from "universal-cookie";

export const setCookies = (key: string, value: string, expireIn: number) => {
  const cookies = new Cookies();
  cookies.set(key, value, {
    path: "/",
    expires: new Date(expireIn),
  });
};
