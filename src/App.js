import "./App.css";
import TaskList from "./components/TaskList";
import React, { useState, useEffect } from "react";
import Login from "./components/Login";
function App() {
    const [username, setUsername] = useState("");
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
                backgroundColor: "#0fc8c0",
                margin: "0px",
            }}
        >
            {username ? (
                <TaskList username={username} />
            ) : (
                <Login onSubmit={setUsername} />
            )}
        </div>
    );
}

export default App;
