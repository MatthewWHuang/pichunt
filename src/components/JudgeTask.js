import React, { useState, useEffect } from "react";
import { downloadFile, getUsersForTask } from "../cloud/cloud";
import TaskHolder from "./TaskHolder";
import darkSwirls from "../dark-swirls.jpg";

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
        <TaskHolder name={name} description={description} onExit={onExit}>
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
                                          cursor: "pointer",
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
            <div style={{ display: "flex", flexDirection: "row" }}>
                <button
                    style={{
                        margin: "20px",
                        fontSize: "5em",
                        borderRadius: "10vw",
                        backgroundColor: "#003487",
                        color: "white",
                        fontFamily: "MuseoModerno",
                    }}
                    type="submit"
                    onClick={() => {
                        onSubmit(usernames[selected]);
                    }}
                    disabled={selected == null}
                >
                    {completed ? "Update Vote" : "Vote"}
                </button>
            </div>
        </TaskHolder>
    );
}

export default JudgeTask;
