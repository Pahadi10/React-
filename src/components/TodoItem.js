import React, { useState } from "react";

function TodoItem({
  task,
  deleteTask,
  toggleCompleted,
  setIsEditing,
  isEditing,
  updateTaskText,
}) {
  const [editedText, setEditedText] = useState(task.text);

  function handleChange() {
    toggleCompleted(task.id);
  }

  function editTask(id) {
    setIsEditing(id);
  }

  function saveChange(id) {
    setIsEditing(null);
    updateTaskText(id, editedText);
  }

  function handleTextChange(event) {
    setEditedText(event.target.value);
  }

  return (
    <div className="todo-item">
      {isEditing === task.id ? (
        <div className="flex items-center gap-6">
          <input
            className="border inpbox"
            value={editedText}
            type="text"
            onChange={handleTextChange}
          />
          <button className="save" onClick={() => saveChange(task.id)}>Save</button>
        </div>
      ) : (
        <div className="flex items-center gap-6 border-b-4 p-4 border-gray-300 w-full rounded-md">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleChange}
          />
          {task.completed ? (
            <p>
              <s>{task.text}</s>
            </p>
          ) : (
            <div className="flex justify-between gap-6">
              <p>{task.text}</p>
              <div className="flex gap-4"> 
              <button onClick={() => editTask(task.id)} className="edit">
                Edit
              </button>
              <button onClick={() => deleteTask(task.id)} className="del">
                Remove
              </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TodoItem;
