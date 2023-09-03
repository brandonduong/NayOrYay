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

export function login() {
  window.location.href = `
  https://warmtake.auth.us-east-1.amazoncognito.com/authorize?response_type=token&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=http://localhost:3000/
`;
}

export function logout() {
  window.location.href = `
  https://warmtake.auth.us-east-1.amazoncognito.com/logout?client_id=${process.env.REACT_APP_CLIENT_ID}&logout_uri=http://localhost:3000/
`;
  // remove cookies
  document.cookie = "id_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie =
    "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export function isLoggedIn() {
  return getCookie("id_token");
}
