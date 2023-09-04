import { Stack, Typography, capitalize } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomCard from "../CustomCard";

export default function QuestionsListItem({ question, index }) {
  const navigate = useNavigate();
  const votes = useSelector((state) => state.votes.value);

  const info = votes.find((v) => v.questionid === question.id);
  const vote = info ? info.vote : "N/A";

  return (
    <>
      <CustomCard
        onClick={() => navigate(`/${question.category}/${index + 1}`)}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <div>
            <Typography gutterBottom variant="h5" component="div">
              {capitalize(question.category)} No. {index + 1}
            </Typography>

            <Typography gutterBottom variant="body2" color="text.secondary">
              {question.text}
            </Typography>
          </div>
          <Typography gutterBottom variant="h6">
            {capitalize(vote)}
          </Typography>
        </Stack>
      </CustomCard>
    </>
  );
}
