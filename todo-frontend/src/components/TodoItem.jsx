export default function TodoItem({ todo, onToggle, onEdit, onDelete }) {
    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <div className="todo-checkbox">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo)}
                    id={`todo-check-${todo.id}`}
                />
            </div>
            <div className="todo-content">
                <h3 className="todo-title">{todo.title}</h3>
                {todo.description && (
                    <p className="todo-description">{todo.description}</p>
                )}
                <span className="todo-date">
                    {new Date(todo.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </span>
            </div>
            <div className="todo-actions">
                <button
                    className="btn btn-edit"
                    onClick={() => onEdit(todo)}
                    id={`todo-edit-${todo.id}`}
                >
                    ✏️
                </button>
                <button
                    className="btn btn-delete"
                    onClick={() => onDelete(todo.id)}
                    id={`todo-delete-${todo.id}`}
                >
                    🗑️
                </button>
            </div>
        </div>
    );
}
