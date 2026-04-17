import { useState } from "react";
import Header from "./components/header";
import Todoinput from "./components/todoinput";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    const trimmed = text.trim();
    if (trimmed === "") return;
    setTodos((current) => [...current, trimmed]);
  };

  return (
    <>
      <Header />
      <Todoinput addTodo={addTodo} />
      <section>
        {todos.length === 0 ? (
          <p>No todos yet. Add one above.</p>
        ) : (
          <ul>
            {todos.map((todo, index) => (
              <li key={`${todo}-${index}`}>{todo}</li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

export default App;