import { useEffect, useState } from "react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  function getCategories() {
    fetch(`/categories`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => console.error(error));
  }

  return (
    <>
      {categories.map(({ category, count }) => (
        <>
          {category}:{count}
        </>
      ))}
    </>
  );
}
