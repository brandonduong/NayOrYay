import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    <>
      <div className="App">
        {category} {id}
        {!loading && (
          <>
            <h1>{question.id}</h1>
            <h4>{question.ts}</h4>
            <Typography variant="h5">{question.text}</Typography>
            <Button onClick={() => voteQuestion(question.id, "yay")}>
              Yay
            </Button>
          </>
        )}
      </div>
    </>
  );
}
