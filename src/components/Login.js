import React, { useState, useEffect } from "react";
import { gameExists as getGameExists } from "../cloud/cloud";

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
                width: "80vw",
                height: "100%",
                backgroundColor: "#26f080",
                borderRadius: "5vw",
                userSelect: "none",
                left: "10vw",
                position: "fixed",
                margin: "0px",
                boxShadow: "0px 0px 15px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "1vh",
                }}
            >
                <label
                    htmlFor="username"
                    style={{ margin: "1vh", fontSize: "5vw" }}
                >
                    Enter Username:{" "}
                </label>
                <input
                    style={{
                        width: "50vw",
                        height: "20vh",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        fontSize: "10vw",
                    }}
                    placeholder="Username"
                    type="text"
                    id="username"
                    onChange={onUsernameChanged}
                />
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "1vh",
                }}
            >
                <label
                    htmlFor="game"
                    style={{ margin: "1vh", fontSize: "5vw" }}
                >
                    Enter Game ID:{" "}
                </label>
                <input
                    style={{
                        width: "50vw",
                        height: "20vh",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        fontSize: "10vw",
                    }}
                    placeholder="Game ID"
                    type="text"
                    id="game"
                    onChange={onGameChanged}
                    defaultValue={gameID}
                />
            </div>
            <button
                style={{ fontSize: "10vh", borderRadius: "1vw" }}
                onClick={(e) => {
                    onSubmit(username, gameID);
                }}
                disabled={username == "" || !gameExists}
            >
                Submit
            </button>
        </div>
    );
}

export default Login;
