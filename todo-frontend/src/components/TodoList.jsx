import TodoItem from './TodoItem';

export default function TodoList({ todos, onToggle, onEdit, onDelete }) {
    if (todos.length === 0) {
        return (
            <div className="empty-state">
                <p>🎉 No todos yet! Add one above to get started.</p>
            </div>
        );
    }

    return (
        <div className="todo-list">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}
