import { useState } from "react";

function Todoinput({ addTodo }) {
  const [todo, setTodo] = useState("");

  const handleAdd = () => {
    if (todo.trim() === "") return;
    addTodo(todo);
    setTodo("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your todo"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default Todoinput;