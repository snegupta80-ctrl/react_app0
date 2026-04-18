import { useState } from "react";
import Header from "./components/header";
import Todoinput from "./components/todoinput";
import Todolist from "./components/todolist";

function App() {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = (newtodo) => {
    setTodos([...todos, newtodo]);
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };

  const handleDeleteTodo = (todoId) => {
    setTodos(todos.filter((_, i) => i !== todoId));
  };

  return (
    <div className="min-h-screen">
      <Header />
      <Todoinput addTodo={handleAddTodo} />
      <Todolist todos={todos} onDelete={handleDeleteTodo} />
    </div>
  );
}

export default App;