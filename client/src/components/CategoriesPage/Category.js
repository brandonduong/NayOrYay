import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  capitalize,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function Category({ category, count, description }) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        border: "1px solid black",
        backgroundColor: "#e3e3e1",
      }}
      variant="outlined"
    >
      <CardActionArea onClick={() => navigate(`/${category}`)}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {capitalize(category)}
          </Typography>
          <Typography gutterBottom variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Typography variant="body2">{count} Questions</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
