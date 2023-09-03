import { Stack, Typography, capitalize } from "@mui/material";

export default function YayCounter({ vote, count }) {
  return (
    <>
      <Stack alignItems={"center"}>
        <Typography variant="h3">{count}</Typography>
        <Typography variant="h5">{capitalize(vote)}'s</Typography>
      </Stack>
    </>
  );
}
