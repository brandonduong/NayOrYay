import { useParams } from "react-router-dom";
import Layout from "../Layout";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Stack, capitalize } from "@mui/material";
import { useEffect, useState } from "react";
import { setQuestions } from "../../features/questions/questionsSlice";
import QuestionsListItem from "./QuestionsListItem";
import Loading from "../Loading";
import CustomButton from "../CustomButton";
import AddQuestionForm from "./AddQuestionForm";
import { getName } from "../../utils/helper";

export default function QuestionsListPage() {
  const { category } = useParams();
  const categories = useSelector((state) => state.categories.value);
  const info =
    categories.filter((c) => !c.category.localeCompare(category))[0] || false;
  const questions = useSelector((state) => state.questions.value);
  const dispatch = useDispatch();

  const fetchCategory =
    !questions[category] || questions[category].length !== info.count;

  const [loading, setLoading] = useState(fetchCategory);
  const [adding, setAdding] = useState(false);

  console.log(questions);

  useEffect(() => {
    if (fetchCategory) {
      getQuestions();
    }
  }, [adding]);

  function getQuestions() {
    fetch(`/api/questions/${category}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(setQuestions({ ...questions, [category]: data.rows }));
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }

  return (
    <>
      <Layout
        title={info.name}
        subtitle={info.description}
        header
        backPath={"/categories"}
      >
        {info && !loading ? (
          <>
            {adding ? (
              <AddQuestionForm setAdding={setAdding} name={info.name} />
            ) : (
              <>
                <Grid
                  container
                  spacing={1}
                  sx={{ overflowY: "auto" }}
                  marginBottom={2}
                >
                  {questions[category].map((q, index) => (
                    <Grid item xs={12} key={`${q.id}`}>
                      <QuestionsListItem question={q} index={index} />
                    </Grid>
                  ))}
                </Grid>
                {Boolean(category.localeCompare("daily")) && (
                  <div style={{ marginBottom: "1rem" }}>
                    <CustomButton
                      variant={"contained"}
                      color="black"
                      onClick={() => setAdding(true)}
                    >
                      +
                    </CustomButton>
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <Loading />
        )}
      </Layout>
    </>
  );
}
