import { Button } from "@mui/material";
import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    const url = window.location;

    let hashed;
    if ((hashed = new URL(url).hash)) {
      const id_token = getFromURL(hashed, "id_token");
      const access_token = getFromURL(hashed, "access_token");
      document.cookie = "id_token=" + id_token;
      document.cookie = "access_token=" + access_token;
      window.location.replace("/");
    }
  }, []);

  function getFromURL(hashed, variable) {
    return hashed
      .split("&")
      .filter(function (el) {
        if (el.match(variable) !== null) return true;
        return false;
      })[0]
      .split("=")[1];
  }

  function getCookie(cname) {
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

  function login() {
    window.location.href = `
    https://warmtake.auth.us-east-1.amazoncognito.com/authorize?response_type=token&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=http://localhost:3000/
`;
  }

  function isLoggedIn() {
    return getCookie("id_token");
  }

  return <>Home{!isLoggedIn() && <Button onClick={login}>Login</Button>}</>;
}
