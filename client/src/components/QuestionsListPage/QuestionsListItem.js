import { Stack, Typography, capitalize } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomCard from "../CustomCard";
import CustomListItem from "../CustomListItem";
import { getName } from "../../utils/helper";

export default function QuestionsListItem({ question, index }) {
  const navigate = useNavigate();
  const votes = useSelector((state) => state.votes.value);
  const categories = useSelector((state) => state.categories.value);

  const info = votes.find((v) => v.questionid === question.id);
  const vote = info ? info.vote : "N/A";

  return (
    <>
      <CustomCard
        onClick={() => navigate(`/${question.category}/${index + 1}`)}
      >
        <CustomListItem
          title={`${getName(question.category, categories)} No. ${index + 1}`}
          secondary={question.text}
          extra={capitalize(vote)}
        />
      </CustomCard>
    </>
  );
}
