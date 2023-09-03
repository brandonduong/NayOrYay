import { Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

export default function Layout({ home, title, subtitle, children }) {
  const navigate = useNavigate();
  return (
    <>
      {home && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "1rem",
          }}
        >
          <HomeIcon onClick={() => navigate("/")} sx={{ cursor: "pointer" }} />
        </div>
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
