import "./App.css";
import { Box, Container, ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuestionPage from "./components/QuestionPage";
import CategoriesPage from "./components/CategoriesPage";
import HomePage from "./components/HomePage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCategories } from "./features/categories/categoriesSlice";
import { getUser } from "./utils/helper";
import { setFetched, setVotes } from "./features/votes/votesSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    getCategories();

    let user;
    if ((user = getUser())) {
      getVotes(user.sub);
    }
  }, []);

  function getCategories() {
    fetch(`/categories`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(setCategories(data));
      })
      .catch((error) => console.error(error));
  }

  function getVotes(sub) {
    fetch(`/votes/${sub}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(setFetched(true));
        dispatch(setVotes(data));
      })
      .catch((error) => console.error(error));
  }

  let theme = createTheme({});

  theme = createTheme(theme, {
    palette: {
      black: theme.palette.augmentColor({
        color: {
          main: "#111111",
          dark: "#000000",
          contrastText: "#FFFFFF",
        },
        name: "black",
      }),
      classified: theme.palette.augmentColor({
        color: {
          main: "#a80000",
        },
        name: "classified",
      }),
    },
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            backgroundColor: "#e3e3e1",
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Container
            maxWidth="sm"
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "center",
            }}
          >
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route path=":category/:id" element={<QuestionPage />} />
            </Routes>
          </Container>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
