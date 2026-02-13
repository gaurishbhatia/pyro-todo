import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { getAllTodos, createTodo, updateTodo, deleteTodo } from './services/todoService';
import './App.css';

function App() {
    const [todos, setTodos] = useState([]);
    const [editingTodo, setEditingTodo] = useState(null);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTodos = async () => {
        try {
            setLoading(true);
            setError(null);
            const completed =
                filter === 'completed' ? true : filter === 'active' ? false : undefined;
            const data = await getAllTodos(completed);
            setTodos(data);
        } catch (err) {
            setError('Failed to load todos. Is the backend running?');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, [filter]);

    const handleAddOrUpdate = async (todoData) => {
        try {
            setError(null);
            if (editingTodo) {
                await updateTodo(editingTodo.id, {
                    ...editingTodo,
                    ...todoData,
                });
                setEditingTodo(null);
            } else {
                await createTodo(todoData);
            }
            fetchTodos();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleToggle = async (todo) => {
        try {
            setError(null);
            await updateTodo(todo.id, { ...todo, completed: !todo.completed });
            fetchTodos();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            setError(null);
            await deleteTodo(id);
            fetchTodos();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEdit = (todo) => {
        setEditingTodo(todo);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setEditingTodo(null);
    };

    const completedCount = todos.filter((t) => t.completed).length;

    return (
        <div className="app">
            <header className="app-header">
                <h1>📝 Todo App</h1>
                <p className="subtitle">Stay organized, get things done</p>
            </header>

            <main className="app-main">
                <TodoForm
                    onSubmit={handleAddOrUpdate}
                    editingTodo={editingTodo}
                    onCancelEdit={handleCancelEdit}
                />

                <div className="controls">
                    <div className="filter-group">
                        <button
                            className={`btn btn-filter ${filter === 'all' ? 'active' : ''}`}
                            onClick={() => setFilter('all')}
                        >
                            All
                        </button>
                        <button
                            className={`btn btn-filter ${filter === 'active' ? 'active' : ''}`}
                            onClick={() => setFilter('active')}
                        >
                            Active
                        </button>
                        <button
                            className={`btn btn-filter ${filter === 'completed' ? 'active' : ''}`}
                            onClick={() => setFilter('completed')}
                        >
                            Completed
                        </button>
                    </div>
                    <span className="todo-count">
                        {completedCount}/{todos.length} completed
                    </span>
                </div>

                {error && <div className="error-message">⚠️ {error}</div>}

                {loading ? (
                    <div className="loading">Loading todos...</div>
                ) : (
                    <TodoList
                        todos={todos}
                        onToggle={handleToggle}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
            </main>
        </div>
    );
}

export default App;
