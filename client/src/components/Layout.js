import { Divider, Grid, Tooltip, Typography } from "@mui/material";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import { useNavigate } from "react-router-dom";
import { getUser } from "../utils/helper";
import Logo from "./Logo";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";

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
              <Tooltip title="Profile">
                <Typography variant="body1" fontWeight={700}>
                  {getUser()["cognito:username"]}
                </Typography>
              </Tooltip>
            </Grid>
            <Grid item xs={4} textAlign={"end"}>
              <Tooltip title="Support me paying my student debt PLEASE">
                <EmojiFoodBeverageIcon
                  onClick={() =>
                    (window.location.href = "https://ko-fi.com/brandonduong")
                  }
                  sx={{
                    cursor: "pointer",
                  }}
                />
              </Tooltip>
              <Tooltip title="Back">
                <ArrowBackIcon
                  onClick={() => navigate(backPath)}
                  sx={{
                    cursor: "pointer",
                  }}
                />
              </Tooltip>
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
