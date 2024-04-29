import TaskItem from "./TaskItem";
import Task from "./Task";
import React, { useState, useEffect } from "react";

function TaskList({ username }) {
    const [tasks, setTasks] = useState([
        {
            name: "Fresh Fruit",
            description: "Take a picture of fresh fruit.",
            completed: false,
            id: "freshfruit",
        },
    ]);
    const [tasksLoaded, setTasksLoaded] = useState(false);
    const changeTask = (index, newTask) => {
        const newTasks = [...tasks];
        newTasks[index] = newTask;
        setTasks(newTasks);
    };
    const [activeTask, setActiveTask] = useState(null);
    const [activeTaskIndex, setActiveTaskIndex] = useState(null);
    const setCompleted = (index, newCompleted) => {
        changeTask(index, { ...tasks[index], completed: newCompleted });
    };
    useEffect(() => {
        if (!tasksLoaded) {
            var loadedTasks = localStorage.getItem("PicHuntTasks");
            if (loadedTasks) {
                setTasks(JSON.parse(loadedTasks));
            }
            setTasksLoaded(true);
        } else {
            localStorage.setItem("PicHuntTasks", JSON.stringify(tasks));
        }
    }, [tasks]);
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <h1>
                Logged in as <b>{username}</b>.
            </h1>
            {tasks.map((task, i) => (
                <TaskItem
                    name={task.name}
                    description={task.description}
                    completed={task.completed}
                    onClick={() => {
                        setActiveTask(task);
                        setActiveTaskIndex(i);
                    }}
                    key={task.id}
                />
            ))}
            {activeTask ? (
                <Task
                    name={activeTask.name}
                    description={activeTask.description}
                    completed={activeTask.completed}
                    setCompleted={(newCompleted) =>
                        setCompleted(activeTaskIndex, newCompleted)
                    }
                    onSubmit={(image) => {
                        setActiveTask(null);
                    }}
                    onExit={() => setActiveTask(null)}
                    id={activeTask.id}
                />
            ) : null}
        </div>
    );
}

export default TaskList;
