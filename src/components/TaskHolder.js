import React, { useState, useRef, useEffect } from "react";

function TaskHolder({ name, description, onExit, ...props }) {
    return (
        <div
            className="task"
            style={{
                width: "80vw",
                maxHeight: "80vh",
                padding: "20px",
                //backgroundImage: `url(${darkSwirls})`,
                backgroundColor: "#3d3c3cf0",
                backgroundSize: "cover",
                borderRadius: "30px",
                userSelect: "none",
                top: "2vh",
                position: "fixed",
                boxShadow: "0px 0px 15px white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                overflow: "scroll",
                zIndex: "2",
                opacity: 0.95,
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    alignSelf: "baseline",
                }}
            >
                <p
                    style={{
                        fontSize: "30px",
                        fontFamily: "sans-serif",
                        color: "red",
                        margin: "10px 10px 0px 0px",
                    }}
                    onClick={onExit}
                >
                    <b>X</b>
                </p>
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
            </div>
            <p
                style={{
                    margin: "0px",
                    color: "white",
                }}
            >
                {description}
            </p>
            {props.children}
        </div>
    );
}

export default TaskHolder;
