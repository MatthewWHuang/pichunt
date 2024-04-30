import React, { useState, useEffect } from "react";
import { gameExists as getGameExists } from "../cloud/cloud";

import purpleSpace from "../purple-space.jpg";

function Login({ onSubmit, defaultGameID }) {
    const [username, setUsername] = useState("");
    const [gameID, setGameID] = useState(defaultGameID || "");
    const [gameExists, setGameExists] = useState(false);
    const onUsernameChanged = (e) => {
        setUsername(e.target.value);
    };
    const onGameChanged = (e) => {
        setGameID(e.target.value);
    };
    useEffect(() => {
        setGameID(defaultGameID);
    }, [defaultGameID]);
    useEffect(() => {
        getGameExists(gameID).then((exists) => setGameExists(exists));
    }, [gameID]);
    return (
        <div
            style={{
                height: "100vh",
                backgroundImage: `url(${purpleSpace})`,
                backgroundSize: "cover",
                borderRadius: "10px",
                userSelect: "none",

                margin: "10px",
                boxShadow: "0px 0px 15px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginTop: 0,
                gap: "30px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <label
                    htmlFor="username"
                    style={{ fontSize: "2em", color: "white", width: "80%" }}
                >
                    Enter Username:{" "}
                </label>
                <input
                    style={{
                        textAlign: "center",
                        fontSize: "2em",
                        fontFamily: "'MuseoModerno', sans-serif",
                        fontWeight: "500",
                        outline: "none",
                        width: "80%",
                    }}
                    placeholder="Username"
                    type="text"
                    id="username"
                    autoComplete="off"
                    onChange={onUsernameChanged}
                />
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: "40px",
                }}
            >
                <label
                    htmlFor="game"
                    style={{ fontSize: "2em", color: "white", width: "80%" }}
                >
                    Enter Game ID:{" "}
                </label>
                <input
                    style={{
                        textAlign: "center",
                        fontSize: "2em",
                        fontFamily: "'MuseoModerno', sans-serif",
                        fontWeight: "500",
                        outline: "none",
                        width: "80%",
                    }}
                    placeholder="Game ID"
                    type="text"
                    id="game"
                    autoComplete="off"
                    onChange={onGameChanged}
                    defaultValue={gameID}
                />
            </div>
            <button
                style={{
                    fontSize: "2.5em",
                    borderRadius: "1vw",
                    fontFamily: "'MuseoModerno', sans-serif",
                    fontWeight: "500",
                    borderColor: "transparent",
                    backgroundColor: "#8dd317",
                    padding: "0px 20px",
                    margin: "20px auto",
                    color: "#5f5959",
                    maxWidth: "500px",
                    opacity:
                        username == "" || gameID == "" || !gameExists ? 0.5 : 1,
                }}
                onClick={(e) => {
                    onSubmit(username, gameID);
                }}
                disabled={username == "" || gameID == "" || !gameExists}
            >
                Join Game
            </button>
        </div>
    );
}

export default Login;
