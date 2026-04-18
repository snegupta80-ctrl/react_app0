import React, { useState, useEffect } from "react";

function Todoitem({ todo, index, deleteTodo }) {
    const [isCompleted, setIsCompleted] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState("");
    const [status, setStatus] = useState("");
    const [reminderTriggered, setReminderTriggered] = useState(false);

    useEffect(() => {
        if (!todo.dueDate || !todo.dueTime || isCompleted) return;

        const updateTimer = () => {
            const now = new Date();
            const dueDatetime = new Date(`${todo.dueDate}T${todo.dueTime}`);
            const diff = dueDatetime - now;

            if (diff < 0) {
                setStatus('overdue');
                setTimeRemaining('Overdue');
                return;
            }

            if (!reminderTriggered && todo.reminder !== 'none') {
                const reminderMs = getReminderMs(todo.reminder);
                if (diff <= reminderMs && diff > reminderMs - 60000) {
                    triggerReminder(todo);
                    setReminderTriggered(true);
                }
            }

            if (diff < 3600000) {
                setStatus('due-soon');
            } else if (diff < 86400000) {
                setStatus('on-time');
            }

            const hours = Math.floor(diff / 3600000);
            const minutes = Math.floor((diff % 3600000) / 60000);
            const seconds = Math.floor((diff % 60000) / 1000);
            const days = Math.floor(diff / 86400000);

            if (days > 0) {
                setTimeRemaining(`${days}d ${hours}h`);
            } else if (hours > 0) {
                setTimeRemaining(`${hours}h ${minutes}m`);
            } else if (minutes > 0) {
                setTimeRemaining(`${minutes}m ${seconds}s`);
            } else {
                setTimeRemaining(`${seconds}s`);
            }
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [todo, reminderTriggered, isCompleted]);

    const getReminderMs = (reminder) => {
        const times = { '5min': 5 * 60 * 1000, '15min': 15 * 60 * 1000, '1hour': 60 * 60 * 1000, '1day': 24 * 60 * 60 * 1000 };
        return times[reminder] || 0;
    };

    const triggerReminder = (task) => {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Task Reminder! 🔔', {
                body: `Reminder: ${task.text || task}`,
                icon: '📋'
            });
        }
    };

    const getPriorityClass = (priority) => {
        return `priority-${priority || 'medium'}`;
    };

    const handleDelete = () => {
        const item = document.querySelector(`[data-index="${index}"]`);
        if (item) {
            item.classList.add('removing');
            setTimeout(() => deleteTodo(index), 400);
        }
    };

    const formatDate = (dateStr, timeStr) => {
        if (!dateStr) return '';
        const date = new Date(`${dateStr}T${timeStr || '00:00'}`);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + (timeStr ? ` at ${timeStr}` : '');
    };

    return (
        <div 
            className={`task-item ${getPriorityClass(todo.priority || 'medium')} ${isCompleted ? 'completed' : ''} ${status ? `status-${status}` : ''}`}
            data-index={index}
        >
            <input type="checkbox" className="checkbox" checked={isCompleted} onChange={(e) => setIsCompleted(e.target.checked)} />
            <div className="task-content">
                <p className="task-text">{typeof todo === 'string' ? todo : todo.text || todo}</p>
                <div className="task-meta">
                    {todo.priority && (<span className={`priority-badge priority-${todo.priority}`}>{todo.priority} Priority</span>)}
                    {todo.dueDate && (<span className={`due-badge ${status}`}>📅 {formatDate(todo.dueDate, todo.dueTime)}</span>)}
                    {timeRemaining && todo.dueDate && (<span className={`time-badge ${status}`}>⏱️ {timeRemaining}</span>)}
                    {todo.reminder !== 'none' && todo.reminder && (<span className="reminder-badge">🔔 Reminder set</span>)}
                </div>
            </div>
            <button onClick={handleDelete} className="btn-delete">Delete</button>
        </div>
    );
}

export default Todoitem;
