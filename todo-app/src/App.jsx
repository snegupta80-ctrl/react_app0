import { useState } from "react";
import Header from "./components/header";
import Todoinput from "./components/todoinput";
import Todolist from "./components/todolist";

function App() {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = (newtodo) => {
    setTodos([...todos, newtodo])

  };

  const handleDeleteTodo = (todoId) => {
    setTodos(todos.filter((_, i) => i !== todoId));
  };

  return (
    <>
      <Header />
      <Todoinput addTodo={handleAddTodo} />
      <Todolist todos={todos} onDelete={handleDeleteTodo} />
    </>
  );
}

export default App;