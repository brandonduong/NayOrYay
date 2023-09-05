import { Card, Stack, TextField, Typography } from "@mui/material";
import CustomButton from "./CustomButton";

export default function CustomForm({
  title,
  children,
  cancel,
  confirm,
  disabled,
}) {
  return (
    <>
      <Card
        sx={{
          border: "1px solid black",
          backgroundColor: "#f6f7f8",
          marginTop: "1rem",
        }}
        variant="outlined"
      >
        <Typography
          marginTop={2}
          gutterBottom
          variant="h5"
          textAlign={"center"}
          lineHeight={1}
        >
          {title}
        </Typography>
        <Stack spacing={2} padding={2}>
          {children}
        </Stack>
      </Card>
      <Stack direction={"row"} marginTop={2} spacing={2}>
        <CustomButton
          variant={"outlined"}
          color="black"
          onClick={cancel}
          disabled={disabled}
        >
          Cancel
        </CustomButton>
        <CustomButton
          variant={"contained"}
          color="black"
          onClick={confirm}
          disabled={disabled}
        >
          Create
        </CustomButton>
      </Stack>
    </>
  );
}
