import "./App.css";
import TaskList from "./components/TaskList";
import React, { useState, useEffect } from "react";
import Login from "./components/Login";

import spaceImage from "./space.jpg";
import Judge from "./components/Judge";
import { loadGame } from "./cloud/cloud";

function App() {
    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const params = {};
        for (const [key, value] of urlParams.entries()) {
            // DecodeURIComponent in case values are URL encoded
            params[key] = decodeURIComponent(value);
        }
        setGameID(params["gameID"] || gameID);
    }, []);
    const [username, setUsername] = useState("");
    const [gameID, setGameID] = useState("");
    const [defaultTasks, setDefaultTasks] = useState([]);
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
    useEffect(() => {
        if (username && !gameID) {
            var oldGameID = localStorage.getItem("PicHuntGameID");
            if (oldGameID) {
                setGameID(oldGameID);
            }
        } else {
            localStorage.setItem("PicHuntGameID", gameID);
        }
    }, [gameID]);
    const onLoginSubmit = (u, g) => {
        setUsername(u);
        setGameID(g);
        loadGame(g).then((tasks) => {
            setDefaultTasks(tasks);
        });
    };
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
                    <Judge defaultTasks={defaultTasks} gameID={gameID} />
                ) : (
                    <TaskList
                        username={username}
                        defaultTasks={defaultTasks}
                        gameID={gameID}
                    />
                )
            ) : (
                <Login onSubmit={onLoginSubmit} defaultGameID={gameID} />
            )}
        </div>
    );
}

export default App;
