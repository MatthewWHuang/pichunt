import "./App.css";
import TaskList from "./components/TaskList";
import React, { useState, useEffect } from "react";
import Login from "./components/Login";

import spaceImage from "./space.jpg";
import Judge from "./components/Judge";

function App() {
    const [username, setUsername] = useState("");
    const defaultTasks = [
        {
            name: "Fresh Fruit",
            description: "Take a picture of fresh fruit.",
            completed: false,
            id: "freshfruit",
        },
    ];
    useEffect(() => {
        if (!username) {
            var oldUsername = localStorage.getItem("PicHuntUsername");
            if (oldUsername) {
                setUsername(oldUsername);
            }
        } else {
            localStorage.setItem("PicHuntUsername", username);
        }
    }, [username]);
    return (
        <div
            className="App"
            style={{
                width: "100%",
                minHeight: "100vh",
                backgroundImage: `url(${spaceImage})`,
                margin: "0px",
            }}
        >
            {username ? (
                username.toLowerCase() == "judge123" ? (
                    <Judge defaultTasks={defaultTasks} />
                ) : (
                    <TaskList username={username} defaultTasks={defaultTasks} />
                )
            ) : (
                <Login onSubmit={setUsername} />
            )}
        </div>
    );
}

export default App;
