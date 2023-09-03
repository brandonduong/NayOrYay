import { Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { isLoggedIn, login, logout } from "../../utils/helper";
import CustomButton from "../CustomButton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../Layout";
import Logo from "../Logo";

export default function HomePage() {
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categories.value);
  const [loading, setLoading] = useState(true);

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
    setLoading(false);
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

  const daily = categories.filter(
    (category) => !category.category.localeCompare("daily")
  )[0];

  const dailyNum = daily && daily.count;

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "0.75rem",
        }}
      >
        <Logo width="80px" height="80px" />
      </div>
      <Layout
        title="Nay or Yay"
        subtitle="Voice your opinion to a new question every day."
      >
        {!loading && (
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems={"center"}
            marginBottom={3}
          >
            <CustomButton
              variant={"outlined"}
              color={"black"}
              onClick={() => {
                navigate(`/categories`);
              }}
            >
              Categories
            </CustomButton>

            {!isLoggedIn() ? (
              <CustomButton
                variant={"outlined"}
                color={"black"}
                onClick={() => login("http://localhost:3000/")}
              >
                Login
              </CustomButton>
            ) : (
              <CustomButton
                variant={"outlined"}
                color={"black"}
                onClick={logout}
              >
                Logout
              </CustomButton>
            )}
            <CustomButton
              variant={"contained"}
              color={"black"}
              onClick={() => navigate(`/daily/${dailyNum}`)}
            >
              Yay
            </CustomButton>
          </Stack>
        )}
        <Typography
          textAlign={"center"}
          variant="body1"
          fontWeight={700}
          lineHeight={1.25}
        >
          {new Date().toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Typography>
        <Typography textAlign={"center"} variant="body1" lineHeight={1.25}>
          No. {dailyNum}
        </Typography>
        <Typography textAlign={"center"} variant="body1" lineHeight={1.25}>
          Edited by Brandon Duong
        </Typography>
      </Layout>
    </>
  );
}
