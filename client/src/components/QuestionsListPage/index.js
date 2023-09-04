import { useParams } from "react-router-dom";
import Layout from "../Layout";
import { useDispatch, useSelector } from "react-redux";
import { capitalize } from "@mui/material";
import { useEffect, useState } from "react";
import { setQuestions } from "../../features/questions/questionsSlice";
import QuestionsListItem from "./QuestionsListItem";

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

  useEffect(() => {
    if (fetchCategory) {
      getQuestions();
    }
  }, []);

  function getQuestions() {
    fetch(`/questions/${category}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(setQuestions({ ...questions, [category]: data }));
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }

  return (
    <>
      <Layout
        title={capitalize(category)}
        subtitle={info.description}
        header
        backPath={"/categories"}
      >
        {info &&
          !loading &&
          questions[category].map((q, index) => (
            <QuestionsListItem question={q} index={index} />
          ))}
      </Layout>
    </>
  );
}
