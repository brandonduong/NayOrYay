import "./App.css";
import { Container } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuestionPage from "./components/QuestionPage";
import CategoriesPage from "./components/CategoriesPage";

function App() {
  function getQuestions() {
    fetch("/questions")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  return (
    <BrowserRouter>
      <Container
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Routes>
          <Route index element={<CategoriesPage />} />
          <Route path=":category/:id" element={<QuestionPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
