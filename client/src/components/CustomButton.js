import { Button } from "@mui/material";

export default function CustomButton({
  onClick,
  variant,
  color,
  children,
  disabled,
}) {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      sx={{
        borderRadius: "1.5rem",
        width: "100%",
        padding: "0.5rem 2rem",
        borderWidth: 1,
        borderColor: `${color} !important`,
      }}
      color={color}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}
