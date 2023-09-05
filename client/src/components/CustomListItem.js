import { Stack, Typography, capitalize } from "@mui/material";

export default function CustomListItem({ title, secondary, extra }) {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <div>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>

        <Typography gutterBottom variant="body2" color="text.secondary">
          {secondary}
        </Typography>
      </div>
      <Typography gutterBottom variant="h6" whiteSpace={"nowrap"}>
        {extra}
      </Typography>
    </Stack>
  );
}
