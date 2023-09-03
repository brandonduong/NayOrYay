import { useSelector } from "react-redux";
import Layout from "../Layout";
import Category from "./Category";
import { Grid } from "@mui/material";

export default function CategoriesPage() {
  const categories = useSelector((state) => state.categories.value);

  return (
    <>
      <Layout title={"Categories"} subtitle={"Nay or Yay every day!"} home>
        <Grid container spacing={2}>
          {categories.map(({ category, count, description }) => (
            <Grid item xs={12} sm={6} key={`${category}`}>
              <Category
                category={category}
                count={count}
                description={description}
              ></Category>
            </Grid>
          ))}
        </Grid>
      </Layout>
    </>
  );
}
