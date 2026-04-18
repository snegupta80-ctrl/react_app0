import React from "react";
import Todoitem from "./todoitem";

function Todolist({ todos, onDelete }) {
    return (
        <div>
            {todos.map((todo, index) => (
                <Todoitem key={index} todo={todo} index={index} deleteTodo={onDelete} />
            ))}
        </div>
    );
}

export default Todolist;
