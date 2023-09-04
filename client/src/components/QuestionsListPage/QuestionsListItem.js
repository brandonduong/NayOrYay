import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function QuestionsListItem({ question, index }) {
  const navigate = useNavigate();
  return (
    <>
      <Card
        sx={{
          border: "1px solid black",
          backgroundColor: "#e3e3e1",
        }}
        variant="outlined"
      >
        <CardActionArea
          onClick={() => navigate(`/${question.category}/${index + 1}`)}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {question.text}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
