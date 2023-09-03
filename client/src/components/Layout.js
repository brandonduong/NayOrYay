import { Divider, Stack, Typography } from "@mui/material";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import { useNavigate } from "react-router-dom";
import { getUser } from "../utils/helper";
import Logo from "./Logo";

export default function Layout({ home, title, subtitle, children }) {
  const navigate = useNavigate();
  return (
    <>
      {home && (
        <>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"flex-end"}
          >
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
            <Typography variant="body1" fontWeight={700}>
              {getUser()["cognito:username"]}
            </Typography>
          </Stack>
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
