import { TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import CustomForm from "../CustomForm";
import { setCategories } from "../../features/categories/categoriesSlice";

export default function AddQuestionForm({ setAdding, name }) {
  const defaultForm = { text: "" };
  const [form, setForm] = useState(defaultForm);
  const [error, setError] = useState(defaultForm);
  const [submitting, setSubmitting] = useState(false);

  const { category } = useParams();
  const categories = useSelector((state) => state.categories.value);
  const dispatch = useDispatch();

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function submit() {
    console.log(form);
    const err = validate();
    if (err.text) {
      setError(err);
    } else {
      setSubmitting(true);
      fetch(`/api/questions/add`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: form.text,
          category,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (!data.error) {
            // Update category to have count + 1
            const cInfo = categories.find(
              (c) => !c.category.localeCompare(category)
            );
            const newCategory = { ...cInfo, count: cInfo.count + 1 };
            const oldCategories = categories.filter((c) =>
              c.category.localeCompare(category)
            );

            const newCategories = [...oldCategories, newCategory].sort((a, b) =>
              a.count > b.count ? -1 : a.count < b.count ? 1 : 0
            );

            dispatch(setCategories(newCategories));
          }

          setForm(defaultForm);
          setSubmitting(false);
          setAdding(false);
        })
        .catch((error) => console.error(error));
    }
  }

  function validate() {
    let err = {
      text: "",
    };
    if (form.text.length > 100) {
      err.name = "Too long (100 characters max)";
    } else if (form.text.length < 3) {
      err.name = "Too short (3 characters min)";
    }
    return err;
  }
  return (
    <CustomForm
      title={`New ${name} Question`}
      cancel={() => setAdding(false)}
      confirm={submit}
      disabled={submitting}
    >
      <TextField
        label="Text:"
        value={form.text}
        name="text"
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
        error={Boolean(error.text)}
        helperText={error.text}
        disabled={submitting}
      />
    </CustomForm>
  );
}
