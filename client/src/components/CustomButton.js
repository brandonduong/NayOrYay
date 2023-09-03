import { Button } from "@mui/material";

export default function CustomButton({ onClick, variant, color, children }) {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      sx={{
        borderRadius: "1.5rem",
        width: "50%",
        padding: "0.5rem 2rem",
        borderWidth: 1,
        borderColor: `${color} !important`,
      }}
      color={color}
    >
      {children}
    </Button>
  );
}
