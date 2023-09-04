import { Card, CardActionArea, CardContent } from "@mui/material";

export default function CustomCard({ children, onClick }) {
  return (
    <Card
      sx={{
        border: "1px solid black",
        backgroundColor: "#f6f7f8",
      }}
      variant="outlined"
    >
      <CardActionArea onClick={onClick}>
        <CardContent>{children}</CardContent>
      </CardActionArea>
    </Card>
  );
}
