import { CircularProgress, Typography } from "@mui/material";

export default function Loading() {
  return (
    <Typography textAlign={"center"}>
      <CircularProgress color="inherit" />
    </Typography>
  );
}
