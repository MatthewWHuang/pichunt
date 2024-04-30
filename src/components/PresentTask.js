import React, { useState, useEffect } from "react";
import {
    downloadFile,
    getFileRef,
    getUsersForTask,
    getWinner,
} from "../cloud/cloud";

import darkSwirls from "../dark-swirls.jpg";

function PresentTask({ name, description, completed, id, onExit, gameID }) {
    const [winningUsername, setWinningUsername] = useState("");
    const [winningImage, setWinningImage] = useState([]);
    const [revealed, setRevealed] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    useEffect(() => {
        getWinner(gameID, id).then((winner) => {
            console.log(winner);
            setWinningUsername(winner);
            downloadFile(getFileRef(gameID, id, winner)).then(setWinningImage);
        });
    }, []);
    return (
        <div
            style={{
                width: "80vw",
                height: "96vh",
                backgroundImage: `url(${darkSwirls})`,
                backgroundSize: "cover",
                opacity: completed ? "80%" : "100%",
                borderRadius: "5vw",
                userSelect: "none",
                top: "2vh",
                position: "fixed",
                margin: "0px",
                boxShadow: "0px 0px 15px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            {revealed ? (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <h1
                        style={{
                            marginBottom: "0px",
                            marginTop: "0",
                            maxWidth: "75vw",
                            fontSize: "3em",
                            color: "white",
                        }}
                    >
                        {name}
                    </h1>
                    <p
                        style={{
                            margin: "0px",
                            color: "white",
                            fontSize: "2em",
                            maxWidth: "75vw",
                        }}
                    >
                        {description}
                    </p>
                    <div>
                        <img
                            style={
                                fullscreen
                                    ? {
                                          position: "fixed",
                                          width: "100vw",
                                          height: "100vh",
                                          objectFit: "contain",
                                          left: "0px",
                                          top: "0px",
                                      }
                                    : { height: "50vh" }
                            }
                            src={winningImage}
                            onClick={() => setFullscreen(!fullscreen)}
                        />
                        <p
                            style={{
                                fontSize: "3em",
                                margin: "0px",
                                color: "white",
                            }}
                        >
                            🏆 {winningUsername} 🏆
                        </p>
                    </div>
                </div>
            ) : (
                <div
                    style={{
                        width: "80%",
                        height: "80%",
                        fontSize: "10vh",
                        borderRadius: "10vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "white",
                    }}
                    onClick={() => setRevealed(true)}
                >
                    <p>Reveal</p>
                </div>
            )}
            <p
                style={{
                    fontSize: "7vh",
                    fontFamily: "sans-serif",
                    color: "red",
                    margin: "0px",
                    position: "absolute",
                    top: "3%",
                    left: "3%",
                }}
                onClick={onExit}
            >
                <b>X</b>
            </p>
        </div>
    );
}

export default PresentTask;
