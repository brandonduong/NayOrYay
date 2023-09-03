import { Button, Stack, Typography, capitalize } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Layout";
import CustomButton from "../CustomButton";

export default function QuestionPage() {
  const { category, id } = useParams();

  const [question, setQuestion] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getQuestion(id, category);
  }, []);

  function getQuestion(id, category) {
    fetch(`/question/${category}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        setQuestion(data);
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
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  return (
    <Layout title={`${capitalize(category)} - ${id}`} subtitle={question.text}>
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
    </Layout>
  );
}
