import { useState, useEffect } from 'react';

export default function TodoForm({ onSubmit, editingTodo, onCancelEdit }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (editingTodo) {
            setTitle(editingTodo.title);
            setDescription(editingTodo.description || '');
        } else {
            setTitle('');
            setDescription('');
        }
    }, [editingTodo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        onSubmit({ title: title.trim(), description: description.trim() });
        setTitle('');
        setDescription('');
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <h2>{editingTodo ? 'Edit Todo' : 'Add New Todo'}</h2>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Title *"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    id="todo-title-input"
                />
            </div>
            <div className="form-group">
                <textarea
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    id="todo-description-input"
                />
            </div>
            <div className="form-actions">
                <button type="submit" className="btn btn-primary" id="todo-submit-btn">
                    {editingTodo ? 'Update' : 'Add Todo'}
                </button>
                {editingTodo && (
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={onCancelEdit}
                        id="todo-cancel-btn"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}
