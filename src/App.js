import "./App.css";
import TaskList from "./components/TaskList";
import React, { useState } from "react";

function App() {
    const [tasks, setTasks] = useState([
        {
            name: "Fresh Fruit",
            description: "Take a picture of fresh fruit.",
            completed: true,
        },
        {
            name: "Fresh Fruit",
            description: "Take a picture of fresh fruit.",
            completed: false,
        },
        {
            name: "Fresh Fruit",
            description: "Take a picture of fresh fruit.",
            completed: false,
        },
        {
            name: "Fresh Fruit",
            description: "Take a picture of fresh fruit.",
            completed: false,
        },
        {
            name: "Fresh Fruit",
            description: "Take a picture of fresh fruit.",
            completed: false,
        },
        {
            name: "Fresh Fruit",
            description: "Take a picture of fresh fruit.",
            completed: false,
        },
        {
            name: "Fresh Fruit",
            description: "Take a picture of fresh fruit.",
            completed: false,
        },
        {
            name: "Fresh Fruit",
            description: "Take a picture of fresh fruit.",
            completed: false,
        },
        {
            name: "Fresh Fruit",
            description: "Take a picture of fresh fruit.",
            completed: false,
        },
        {
            name: "Fresh Fruit",
            description: "Take a picture of fresh fruit.",
            completed: false,
        },
    ]);
    const changeTask = (index, newTask) => {
        const newTasks = [...tasks];
        newTasks[index] = newTask;
        setTasks(newTasks);
    };
    return (
        <div
            className="App"
            style={{
                width: "100%",
                minHeight: "100vh",
                backgroundColor: "#0fc8c0",
                margin: "0px",
            }}
        >
            <TaskList tasks={tasks} changeTask={changeTask} />
        </div>
    );
}

export default App;
