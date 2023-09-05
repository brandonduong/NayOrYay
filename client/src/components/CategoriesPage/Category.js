import { capitalize } from "@mui/material";

import { useNavigate } from "react-router-dom";
import CustomCard from "../CustomCard";
import CustomListItem from "../CustomListItem";

export default function Category({ category, count, description, name }) {
  const navigate = useNavigate();

  return (
    <CustomCard onClick={() => navigate(`/${category}`)}>
      <CustomListItem
        title={name}
        secondary={description}
        extra={`${count} Questions`}
      />
    </CustomCard>
  );
}
