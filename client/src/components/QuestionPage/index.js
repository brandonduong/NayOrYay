import {
  Button,
  CircularProgress,
  Stack,
  Typography,
  capitalize,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Layout";
import CustomButton from "../CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { setVotes } from "../../features/votes/votesSlice";
import { getUser, login } from "../../utils/helper";
import { setQuestions } from "../../features/questions/questionsSlice";

export default function QuestionPage() {
  const { category, id } = useParams();
  const questions = useSelector((state) => state.questions.value);

  const [question, setQuestion] = useState(
    questions.find(
      (q) => q.categoryId === id && !q.category.localeCompare(category)
    ) || false
  );
  const [loading, setLoading] = useState(!question);
  const [voting, setVoting] = useState(false);
  const votes = useSelector((state) => state.votes.value);
  const fetched = useSelector((state) => state.votes.fetched);
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
        setQuestion(data);
        const newQuestion = { ...data, categoryId: id };
        dispatch(setQuestions([...questions, newQuestion]));
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }

  function voteQuestion(id, vote) {
    setVoting(true);
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
        setVoting(false);
      })
      .catch((error) => console.error(error));
  }

  function voted() {
    return votes.filter((vote) => vote.questionid === question.id).length !== 0;
  }

  function handleAy(vote) {
    if (getUser()) {
      voteQuestion(question.id, vote);
    } else {
      login(`http://localhost:3000/`);
    }
  }

  return (
    <Layout
      title={`${capitalize(category)} - No. ${id}`}
      subtitle={question.text}
      home
    >
      {!loading ? (
        <>
          <Typography
            textAlign={"center"}
            variant="body1"
            fontWeight={700}
            marginBottom={"2rem"}
          >
            Asked by: {question.author}
          </Typography>

          {!voting && (fetched || !getUser()) && !voted() && (
            <Stack direction={"row"} spacing={2}>
              <CustomButton
                variant={"outlined"}
                color={"black"}
                onClick={() => handleAy("nay")}
              >
                Nay
              </CustomButton>
              <CustomButton
                variant={"contained"}
                color={"black"}
                onClick={() => handleAy("yay")}
              >
                Yay
              </CustomButton>
            </Stack>
          )}
        </>
      ) : (
        <Typography textAlign={"center"}>
          <CircularProgress color="inherit" />
        </Typography>
      )}
    </Layout>
  );
}
