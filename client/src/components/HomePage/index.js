import { Button } from "@mui/material";

export default function HomePage() {
  function login() {
    window.location.href = `
    https://warmtake.auth.us-east-1.amazoncognito.com/authorize?response_type=token&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=http://localhost:3000
`;
  }

  return (
    <>
      Home<Button onClick={login}>Login</Button>
    </>
  );
}
