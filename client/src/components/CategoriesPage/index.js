import { useSelector } from "react-redux";
import Layout from "../Layout";
import Category from "./Category";
import { Grid } from "@mui/material";
import CustomButton from "../CustomButton";
import { useState } from "react";
import { getUser, login } from "../../utils/helper";
import AddCategoryForm from "./AddCategoryForm";
import Loading from "../Loading";

export default function CategoriesPage() {
  const categories = useSelector((state) => state.categories.value);
  const [adding, setAdding] = useState(false);

  function handleAdd() {
    if (getUser()) {
      setAdding(true);
    } else {
      login(`http://localhost:3000/`);
    }
  }

  return (
    <>
      <Layout
        title={"Categories"}
        subtitle={"Nay or Yay every day!"}
        header
        backPath={"/"}
      >
        {categories.length > 0 ? (
          <>
            {adding ? (
              <AddCategoryForm setAdding={setAdding} />
            ) : (
              <>
                <Grid
                  container
                  spacing={1}
                  sx={{ overflowY: "auto" }}
                  marginTop={1}
                  marginBottom={2}
                >
                  {categories.map(({ category, count, description, name }) => (
                    <Grid item xs={12} key={`${category}`}>
                      <Category
                        category={category}
                        count={count}
                        description={description}
                        name={name}
                      ></Category>
                    </Grid>
                  ))}
                </Grid>
                <div style={{ marginBottom: "1rem" }}>
                  <CustomButton
                    variant={"contained"}
                    color="black"
                    onClick={handleAdd}
                  >
                    +
                  </CustomButton>
                </div>
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
