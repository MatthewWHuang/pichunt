import React, { useState, useEffect } from "react";
import { downloadFile, getUsersForTask } from "../cloud/cloud";

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
        <div
            style={{
                width: "80vw",
                height: "70vh",
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
            <h1
                style={{
                    marginBottom: "0px",
                    marginTop: "0",
                    maxWidth: "75vw",
                    color: "white",
                }}
            >
                {name}
            </h1>
            <p style={{ margin: "0px", marginBottom: "10vh", color: "white" }}>
                {description}
            </p>
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
        </div>
    );
}

export default JudgeTask;
