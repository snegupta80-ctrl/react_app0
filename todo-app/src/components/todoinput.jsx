import { useState } from "react";

function Todoinput({ addTodo }) {
  const [todo, setTodo] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [reminder, setReminder] = useState("none");

  const handleAdd = () => {
    if (todo.trim() === "") return;
    addTodo({ 
      text: todo, 
      priority,
      dueDate,
      dueTime,
      reminder,
      createdAt: new Date().toISOString()
    });
    setTodo("");
    setPriority("medium");
    setDueDate("");
    setDueTime("");
    setReminder("none");
  };

  const selectStyle = {
    padding: "0.875rem 1.25rem",
    fontSize: "1rem",
    border: "2px solid #e5e7eb",
    borderRadius: "0.875rem",
    background: "rgba(255, 255, 255, 0.95)",
    cursor: "pointer",
    transition: "all 200ms"
  };

  return (
    <div className="input-section">
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Add a new task..."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={selectStyle}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={selectStyle}
        />
        <input
          type="time"
          value={dueTime}
          onChange={(e) => setDueTime(e.target.value)}
          style={selectStyle}
        />
        <select
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
          style={selectStyle}
        >
          <option value="none">No Reminder</option>
          <option value="5min">5 min before</option>
          <option value="15min">15 min before</option>
          <option value="1hour">1 hour before</option>
          <option value="1day">1 day before</option>
        </select>
        <button
          onClick={handleAdd}
          className="btn-add"
        >
          Add Task
        </button>
      </div>
    </div>
  );
}

export default Todoinput;