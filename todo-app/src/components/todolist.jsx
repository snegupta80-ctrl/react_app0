import React, { useState } from "react";
import Todoitem from "./todoitem";

function Todolist({ todos, onDelete }) {
    const [filter, setFilter] = useState('all');
    const [completedItems, setCompletedItems] = useState(new Set());

    const filteredTodos = todos.filter(todo => {
        if (filter === 'all') return true;
        if (filter === 'active') return !completedItems.has(todos.indexOf(todo));
        if (filter === 'completed') return completedItems.has(todos.indexOf(todo));
        return true;
    });

    return (
        <>
            <div className="filter-section">
                <button 
                    className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                >
                    All Tasks
                </button>
                <button 
                    className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
                    onClick={() => setFilter('active')}
                >
                    Active
                </button>
                <button 
                    className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                    onClick={() => setFilter('completed')}
                >
                    Completed
                </button>
            </div>
            <div className="task-list">
                {todos.length === 0 ? (
                    <div className="empty-state">
                        <p>✨ No tasks yet. Add one to get started!</p>
                    </div>
                ) : filteredTodos.length === 0 ? (
                    <div className="empty-state">
                        <p>🎉 No {filter} tasks!</p>
                    </div>
                ) : (
                    <div>
                        {filteredTodos.map((todo, index) => (
                            <Todoitem 
                                key={index} 
                                todo={todo} 
                                index={index} 
                                deleteTodo={onDelete} 
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default Todolist;
