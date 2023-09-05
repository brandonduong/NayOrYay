import {
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CustomButton from "../CustomButton";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../../features/categories/categoriesSlice";

export default function AddCategoryForm({ setAdding }) {
  const defaultForm = { name: "", description: "" };
  const [form, setForm] = useState(defaultForm);
  const [error, setError] = useState(defaultForm);
  const [submitting, setSubmitting] = useState(false);

  const categories = useSelector((state) => state.categories.value);
  const dispatch = useDispatch();

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function submit() {
    console.log(form);
    const err = validate();
    if (err.name || err.description) {
      setError(err);
    } else {
      setSubmitting(true);
      fetch(`/api/categories/add`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (!data.error) {
            // Add category to store
            const newCategory = {
              category: form.name,
              count: 0,
              description: form.description,
            };
            const newCategories = [...categories, newCategory].sort(
              (a, b) => a.count < b.count
            );
            dispatch(setCategories(newCategories));
          }

          setForm({ name: "", description: "" });
          setSubmitting(false);
          setAdding(false);
        })
        .catch((error) => console.error(error));
    }
  }

  function validate() {
    let err = {
      name: "",
      description: "",
    };
    if (form.name.length > 21) {
      err.name = "Too long (21 characters max)";
    } else if (form.name.length < 3) {
      err.name = "Too short (3 characters min)";
    }

    if (form.description.length > 80) {
      err.description = "Too long (80 characters max)";
    } else if (form.description.length < 3) {
      err.description = "Too short (3 characters min)";
    }
    return err;
  }

  return (
    <>
      <Card
        sx={{
          border: "1px solid black",
          backgroundColor: "#f6f7f8",
          marginTop: "1rem",
        }}
        variant="outlined"
      >
        <Typography
          marginTop={2}
          gutterBottom
          variant="h5"
          textAlign={"center"}
          lineHeight={1}
        >
          New Category
        </Typography>
        <Stack spacing={2} padding={2}>
          <TextField
            label="Name:"
            value={form.name}
            name="name"
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            error={Boolean(error.name)}
            helperText={error.name}
            disabled={submitting}
          />
          <TextField
            label="Description:"
            value={form.description}
            name="description"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
            error={Boolean(error.description)}
            helperText={error.description}
            disabled={submitting}
          />
        </Stack>
      </Card>
      <Stack direction={"row"} marginTop={2} spacing={2}>
        <CustomButton
          variant={"outlined"}
          color="black"
          onClick={() => setAdding(false)}
          disabled={submitting}
        >
          Cancel
        </CustomButton>
        <CustomButton
          variant={"contained"}
          color="black"
          onClick={submit}
          disabled={submitting}
        >
          Create
        </CustomButton>
      </Stack>
    </>
  );
}
