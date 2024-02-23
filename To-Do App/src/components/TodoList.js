import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

function Todo() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    return storedTasks || [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const [text, setText] = useState("");
  // const [newTask, setNewTask] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [filter, setFilter] = useState("all");
  const [selectAll, setSelectAll] = useState(false);

  function addTask(text) {
    const newTask = {
      id: Date.now(),
      text: text,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setText("");
  }

  function deleteTask(id) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  }

  function toggleCompleted(id) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        } else {
          return task;
        }
      })
    );
  }

  function updateTaskText(taskId, newText) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, text: newText };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function handleChange(event) {
    setFilter(event.target.value);
  }

  function selectAllHandler() {
    setSelectAll(!selectAll);

    if (!selectAll) {
      setTasks(
        tasks.map((task) => {
          return { ...task, completed: true };
        })
      );
    } else {
      setTasks(
        tasks.map((task) => {
          return { ...task, completed: false };
        })
      );
    }
  }

  function deleteAllHandler() {
    setSelectAll(false);
    const updatedTasks = tasks.filter((task) => task.completed === false);
    setTasks(updatedTasks);
  }

  return (
    <div className="main">
      <div>Todo List</div>

      <div className="nav flex justify-evenly w-screen">
        <div className="">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="addInp"
          />
          <button className="addInp" onClick={() => addTask(text)}>Add Task</button>
        </div>
        <select onChange={handleChange} className="selectbox">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Uncompleted</option>
        </select>
        {tasks.length > 0 && (
          <label id="selectall">
            {selectAll ? (
              <button onClick={selectAllHandler}>Unselect All</button>
            ) : (
              <button onClick={selectAllHandler}>Select All</button>
            )}
          </label>
        )}
        {selectAll && <button onClick={deleteAllHandler}>Delete</button>}
      </div>

      {tasks.length > 0 ? (
        <div className="tasklist">
          {filter === "completed" &&
            tasks
              .filter((task) => !!task.completed)
              .map((task) => (
                <TodoItem
                  key={task.id}
                  task={task}
                  deleteTask={deleteTask}
                  toggleCompleted={toggleCompleted}
                  setIsEditing={setIsEditing}
                  isEditing={isEditing}
                  tasks={tasks}
                  updateTaskText={updateTaskText}
                />
              ))}

          {filter === "incomplete" &&
            tasks
              .filter((task) => task.completed === false)
              .map((task) => (
                <TodoItem
                  key={task.id}
                  task={task}
                  deleteTask={deleteTask}
                  toggleCompleted={toggleCompleted}
                  setIsEditing={setIsEditing}
                  isEditing={isEditing}
                  tasks={tasks}
                  updateTaskText={updateTaskText}
                />
              ))}

          {filter === "all" &&
            tasks.map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                toggleCompleted={toggleCompleted}
                setIsEditing={setIsEditing}
                isEditing={isEditing}
                tasks={tasks}
                updateTaskText={updateTaskText}
              />
            ))}
        </div>
      ) : (
        <div><h1>Task List is empty!</h1><h2>Add a New task!</h2></div>
      )}
    </div>
  );
}

export default Todo;
