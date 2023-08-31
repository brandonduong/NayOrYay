import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [flower, setFlower] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFlower();
    getQuestions();
  }, []);

  function getFlower() {
    fetch("/flower")
      .then((response) => response.json())
      .then((data) => {
        setFlower(data);
        setLoading(false);
      });
  }

  function getQuestions() {
    fetch("/questions")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  return (
    <div className="App">
      {!loading && (
        <>
          <h1>{flower.name}</h1>
          <h3>{flower.colour}</h3>
        </>
      )}
    </div>
  );
}

export default App;
