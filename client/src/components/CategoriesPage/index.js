import { useSelector } from "react-redux";
import Layout from "../Layout";
import Category from "./Category";
import { Divider, Grid, Tooltip } from "@mui/material";
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

  const daily = categories.find((c) => !c.category.localeCompare("daily"));
  const others = categories.filter((c) => c.category.localeCompare("daily"));

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
                  <Grid item xs={12}>
                    <Category
                      category={daily.category}
                      count={daily.count}
                      description={daily.description}
                      name={daily.name}
                    ></Category>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider flexItem />
                  </Grid>

                  {others.map(({ category, count, description, name }) => (
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
                <Tooltip title="Create your own category!">
                  <div style={{ marginBottom: "1rem" }}>
                    <CustomButton
                      variant={"contained"}
                      color="black"
                      onClick={handleAdd}
                    >
                      +
                    </CustomButton>
                  </div>
                </Tooltip>
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
