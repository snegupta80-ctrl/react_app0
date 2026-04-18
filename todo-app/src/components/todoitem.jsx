import React from "react";

function Todoitem({ todo, index, deleteTodo }) {
    return (
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <p>{todo}</p>
            <button onClick={() => deleteTodo(index)}>Delete</button>
        </div>
    );
}

export default Todoitem;
