import "./App.css";
import {
  Box,
  Container,
  Grid,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuestionPage from "./components/QuestionPage";
import CategoriesPage from "./components/CategoriesPage";
import HomePage from "./components/HomePage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCategories } from "./features/categories/categoriesSlice";
import { getUser } from "./utils/helper";
import { setFetched, setVotes } from "./features/votes/votesSlice";
import QuestionsListPage from "./components/QuestionsListPage";
import Ad from "./components/Ad";
import ProfilePage from "./components/ProfilePage";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    getCategories();

    let user;
    if ((user = getUser())) {
      getVotes(user["cognito:username"]);
    }
  }, []);

  function getCategories() {
    fetch(`/api/categories`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(setCategories(data.rows));
      })
      .catch((error) => console.error(error));
  }

  function getVotes(username) {
    fetch(`/api/votes/${username}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(setFetched(true));
        dispatch(setVotes(data.rows));
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
            backgroundColor: "#edeff1",
            flexGrow: 1,
            height: "100vh",
          }}
        >
          <Grid container alignItems={"center"}>
            <Grid item sm={3}>
              <Ad dataAdSlot={8428518966} />
              <Ad dataAdSlot={8916685694} />
              <Ad dataAdSlot={2100033897} />
            </Grid>
            <Grid item sm={6}>
              <Container
                maxWidth="sm"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100vh",

                  backgroundColor: "#edeff1",
                }}
              >
                <Routes>
                  <Route index element={<HomePage />} />
                  <Route path="categories" element={<CategoriesPage />} />
                  <Route path=":category" element={<QuestionsListPage />} />
                  <Route path=":category/:id" element={<QuestionPage />} />
                  <Route path="profile/:username" element={<ProfilePage />} />
                </Routes>
              </Container>
            </Grid>
            <Grid item sm={3}>
              <Ad dataAdSlot={8428518966} />
              <Ad dataAdSlot={8916685694} />
              <Ad dataAdSlot={2100033897} />
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
