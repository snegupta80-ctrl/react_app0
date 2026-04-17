import react from "react"
import Todoitem from "./todoitem";

function Todolist({ todos,deletetodo }) {
    return (
        <div>
            {todos.map((todo, index) => (
                <Todoitem key={index} todo={todo} index={index} deleteTodo={deleteTodo} />
            ))}
        </div>
    )
export default Todolist;
