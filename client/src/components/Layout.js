import { Typography } from "@mui/material";

export default function Layout({ title, subtitle, children }) {
  return (
    <>
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
