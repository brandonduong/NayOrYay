import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Layout";
import { getName, getUser } from "../../utils/helper";
import { useSelector } from "react-redux";
import { Divider, Grid, Stack, Typography, capitalize } from "@mui/material";
import Loading from "../Loading";
import { useEffect, useState } from "react";
import CustomCard from "../CustomCard";
import CustomListItem from "../CustomListItem";

export default function ProfilePage() {
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState([]);
  const categories = useSelector((state) => state.categories.value);
  const navigate = useNavigate();

  useEffect(() => {
    getProfile();
  }, []);

  function getProfile() {
    fetch(`/api/profile/${username}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProfile(data.rows);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }

  return (
    <>
      <Layout
        title={username}
        subtitle={"Their Nays and Yays"}
        header
        backPath={"/categories"}
      >
        {!loading ? (
          <Grid
            container
            spacing={1}
            sx={{ overflowY: "auto" }}
            marginTop={1}
            marginBottom={2}
          >
            {categories.map(({ category, name }) => {
              const votes = profile.filter(
                (v) => !v.category.localeCompare(category)
              );
              if (votes.length > 0) {
                return (
                  <Grid item xs={12} key={`${category}`}>
                    <CustomCard onClick={() => navigate(`/${category}`)}>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        fontFamily={"Roboto Condensed"}
                      >
                        {name}
                      </Typography>
                      {votes.map((v) => (
                        <>
                          <Divider />
                          <Stack
                            direction={"row"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            spacing={2}
                          >
                            <Typography variant="body2" color="text.secondary">
                              {v.text}
                            </Typography>
                            <Typography variant="h6">
                              {capitalize(v.vote)}
                            </Typography>
                          </Stack>
                        </>
                      ))}
                      <Divider />
                    </CustomCard>
                  </Grid>
                );
              }
              return <></>;
            })}
          </Grid>
        ) : (
          <Loading />
        )}
      </Layout>
    </>
  );
}
