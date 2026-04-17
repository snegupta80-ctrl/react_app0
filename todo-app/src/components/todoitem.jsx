import react from "react";

function Todolist({ todos }) {
    return (
        <div>
            <p>{todos.length}
                <button onClick={() => deleteTodo(index)}>Delete </button>
            </p>
        </div>
    )
}

export default Todoitem;
;
