import { useSelector } from "react-redux";
import Layout from "../Layout";
import Category from "./Category";
import { Grid } from "@mui/material";

export default function CategoriesPage() {
  const categories = useSelector((state) => state.categories.value);

  return (
    <Layout title={"Categories"}>
      <Grid container spacing={2}>
        {categories.map(({ category, count, description }) => (
          <Grid item xs="12" sm={"6"}>
            <Category
              category={category}
              count={count}
              description={description}
            ></Category>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}
