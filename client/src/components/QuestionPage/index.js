import { Button, Stack, Typography, capitalize } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Layout";
import CustomButton from "../CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { setVotes } from "../../features/votes/votesSlice";
import { getUser } from "../../utils/helper";
import { setQuestions } from "../../features/questions/questionsSlice";

export default function QuestionPage() {
  const { category, id } = useParams();
  const questions = useSelector((state) => state.questions.value);

  const [question, setQuestion] = useState(
    questions.find(
      (q) => q.categoryId === id && !q.category.localeCompare(category)
    ) || false
  );
  const [loading, setLoading] = useState(true);
  const votes = useSelector((state) => state.votes.value);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!question) {
      getQuestion(id, category);
    }
  }, []);

  function getQuestion(id, category) {
    fetch(`/question/${category}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        setQuestion(data);
        const newQuestion = { ...data, categoryId: id };
        dispatch(setQuestions([...questions, newQuestion]));
      })
      .catch((error) => console.error(error));
  }

  function voteQuestion(id, vote) {
    fetch(`/vote`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, vote }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Add vote to store
        const newVote = { sub: getUser().sub, vote, questionid: id };
        if (!voted()) {
          dispatch(setVotes([...votes, newVote]));
        }
      })
      .catch((error) => console.error(error));
  }

  function voted() {
    return votes.filter((vote) => vote.questionid === question.id).length !== 0;
  }

  return (
    <Layout
      title={`${capitalize(category)} - No. ${id}`}
      subtitle={question.text}
      home
    >
      <Typography
        textAlign={"center"}
        variant="body1"
        fontWeight={700}
        marginBottom={"2rem"}
      >
        Asked by: {question.author}
      </Typography>

      {!voted() && (
        <Stack direction={"row"} spacing={2}>
          <CustomButton
            variant={"outlined"}
            color={"black"}
            onClick={() => voteQuestion(question.id, "nay")}
          >
            Nay
          </CustomButton>
          <CustomButton
            variant={"contained"}
            color={"black"}
            onClick={() => voteQuestion(question.id, "yay")}
          >
            Yay
          </CustomButton>
        </Stack>
      )}
    </Layout>
  );
}
