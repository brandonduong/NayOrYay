import { Typography, capitalize } from "@mui/material";

import { useNavigate } from "react-router-dom";
import CustomCard from "../CustomCard";

export default function Category({ category, count, description }) {
  const navigate = useNavigate();

  return (
    <CustomCard onClick={() => navigate(`/${category}`)}>
      <Typography gutterBottom variant="h5" component="div">
        {capitalize(category)}
      </Typography>
      <Typography gutterBottom variant="body2" color="text.secondary">
        {description}
      </Typography>
      <Typography variant="body2">{count} Questions</Typography>
    </CustomCard>
  );
}
