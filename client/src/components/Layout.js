import { Divider, Grid, Typography } from "@mui/material";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import { useNavigate } from "react-router-dom";
import { getUser } from "../utils/helper";
import Logo from "./Logo";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Layout({
  header,
  backPath,
  title,
  subtitle,
  children,
}) {
  const navigate = useNavigate();
  return (
    <>
      {header && (
        <>
          <Grid container direction={"row"} alignItems={"flex-end"}>
            <Grid item xs={4}>
              <div
                style={{
                  display: "flex",
                  marginTop: "1rem",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  textAlign={"center"}
                  sx={{
                    fontFamily: "Roboto Condensed",
                    cursor: "pointer",
                    paddingRight: "0.25rem",
                  }}
                  onClick={() => navigate("/")}
                >
                  Nay or Yay
                </Typography>

                <Logo onClick={() => navigate("/")} cursor="pointer" />
              </div>
            </Grid>
            <Grid item xs={4} textAlign={"center"}>
              <Typography variant="body1" fontWeight={700}>
                {getUser()["cognito:username"]}
              </Typography>
            </Grid>
            <Grid item xs={4} textAlign={"end"}>
              <ArrowBackIcon
                onClick={() => navigate(backPath)}
                sx={{
                  cursor: "pointer",
                }}
              />
            </Grid>
          </Grid>
          <Divider sx={{ marginBottom: "2rem" }} />
        </>
      )}

      <Typography
        variant="h3"
        textAlign={"center"}
        gutterBottom
        sx={{ fontFamily: "Roboto Condensed" }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="h4"
          textAlign={"center"}
          sx={{ marginBottom: "2rem" }}
        >
          {subtitle}
        </Typography>
      )}
      {children}
    </>
  );
}
