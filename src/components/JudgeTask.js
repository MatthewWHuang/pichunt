import React, { useState, useEffect } from "react";
import { downloadFile, getUsersForTask } from "../cloud/cloud";

function JudgeTask({
    name,
    description,
    completed,
    id,
    onSubmit,
    onExit,
    gameID,
}) {
    const [usernames, setUsernames] = useState([]);
    const [images, setImages] = useState([]);
    const [selected, setSelected] = useState(null);
    useEffect(() => {
        getUsersForTask(gameID, id)
            .then(async (res) => {
                setUsernames(res.items.map((image) => image.name));
                return Promise.all(
                    res.items.map(async (image) => await downloadFile(image))
                );
            })
            .then((res) => {
                setImages(res);
            });
    }, []);
    return (
        <div
            style={{
                width: "80vw",
                height: "70vh",
                backgroundColor: completed ? "#8ed9af" : "#26f080",
                borderRadius: "5vw",
                userSelect: "none",
                top: "15vh",
                position: "fixed",
                margin: "0px",
                boxShadow: "0px 0px 15px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <h1>{name}</h1>
            <p>{description}</p>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    overflow: "scroll",
                    maxWidth: "80vw",
                }}
            >
                {images.length
                    ? images.map((image, i) => {
                          return (
                              <div
                                  style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      margin: "10px",
                                  }}
                                  key={i}
                                  onClick={() => setSelected(i)}
                              >
                                  <div
                                      style={{
                                          backgroundColor:
                                              selected == i
                                                  ? "#15bb2f"
                                                  : "#1febb0",
                                          borderRadius: "1vw",
                                          marginRight: "5px",
                                          marginBottom: "5px",
                                      }}
                                  >
                                      Vote{selected == i ? "d" : ""}
                                  </div>
                                  <img
                                      src={image}
                                      style={{
                                          maxWidth: "70vw",
                                          height: "30vh",
                                      }}
                                  />
                              </div>
                          );
                      })
                    : null}
            </div>
            {completed ? null : (
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <button
                        style={{ fontSize: "10vh", borderRadius: "1vw" }}
                        type="submit"
                        onClick={() => {
                            onSubmit(usernames[selected]);
                        }}
                        disabled={selected == null}
                    >
                        Submit
                    </button>
                    <p
                        style={{
                            fontSize: "10vh",
                            color: "red",
                            margin: "0px",
                        }}
                        onClick={onExit}
                    >
                        <b>X</b>
                    </p>
                </div>
            )}
        </div>
    );
}

export default JudgeTask;
