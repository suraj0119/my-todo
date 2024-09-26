import React, { useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

// Custom Hook for Local Storage
function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setValue];
}

export const ToDoList = () => {
    // Use the custom hook to manage tasks in local storage
    const [tasks, setTasks] = useLocalStorage('tasks', []);
    const [newTask, setNewTask] = useState("");

    function handleInputChange(e) {
        setNewTask(e.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks((t) => [...t, newTask]);
            setNewTask("");
        } else {
            alert("Add a task");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] =
                [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] =
                [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    return (
        <div className='ToDoList'>
            <h1>ToDoList</h1>

            <input
                type='text'
                placeholder='Enter a Task...'
                value={newTask}
                onChange={handleInputChange}
            />

            <button className='add-btn' onClick={addTask}>
                Add Task
            </button>

            <ol>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <span className='text'>{task}</span>

                        <button className='delete-btn' onClick={() => deleteTask(index)}>
                            Delete
                        </button>

                        <button className='move-btn' onClick={() => moveTaskUp(index)}>
                            <FaArrowUp />
                        </button>

                        <button className='move-btn' onClick={() => moveTaskDown(index)}>
                            <FaArrowDown />
                        </button>
                    </li>
                ))}
            </ol>
        </div>
    );
};
