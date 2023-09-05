export function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function login(redirect) {
  window.location.href = `
  https://warmtake.auth.us-east-1.amazoncognito.com/authorize?response_type=token&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${redirect}
`;
}

export function logout(redirect) {
  window.location.href = `
  https://warmtake.auth.us-east-1.amazoncognito.com/logout?client_id=${process.env.REACT_APP_CLIENT_ID}&logout_uri=${redirect}
`;
  // remove cookies
  document.cookie = "id_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie =
    "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export function isLoggedIn() {
  return getCookie("id_token");
}

export const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export function getUser() {
  return parseJwt(getCookie("id_token")) || false;
}

export function getName(categoryId, categories) {
  let category;
  if (
    (category = categories.find((c) => !c.category.localeCompare(categoryId)))
  ) {
    return category.name;
  }
  return false;
}
