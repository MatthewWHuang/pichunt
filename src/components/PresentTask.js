import React, { useState, useEffect } from "react";
import {
    downloadFile,
    getFileRef,
    getUsersForTask,
    getWinner,
} from "../cloud/cloud";

import darkSwirls from "../dark-swirls.jpg";
import TaskHolder from "./TaskHolder";

function PresentTask({ name, description, completed, id, onExit, gameID }) {
    const [winningUsername, setWinningUsername] = useState("");
    const [winningImage, setWinningImage] = useState([]);
    const [revealed, setRevealed] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    useEffect(() => {
        getWinner(gameID, id).then((winner) => {
            setWinningUsername(winner);
            downloadFile(getFileRef(gameID, id, winner)).then(setWinningImage);
        });
    }, []);
    return (
        <TaskHolder name={name} description={description} onExit={onExit}>
            {revealed ? (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
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
        </TaskHolder>
    );
}

export default PresentTask;
