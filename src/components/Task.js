import React, { useState } from "react";

function Task({
    name,
    description,
    completed,
    setCompleted,
    onSubmit,
    onExit,
}) {
    const [image, setImage] = useState(null);
    const onImageChanged = (e) => {
        console.log(e.target.files[0]);
        setImage(e.target.files[0]);
    };
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
            <input
                style={{ fontSize: "2vh", marginLeft: "20vw" }}
                type="file"
                title="Upload Image"
                accept="image/*"
                onChange={onImageChanged}
            />
            {image ? (
                <img
                    style={{ maxWidth: "70vw", height: "30vh" }}
                    src={URL.createObjectURL(image)}
                />
            ) : null}
            <div style={{ display: "flex", flexDirection: "row" }}>
                <button
                    style={{ fontSize: "10vh", borderRadius: "1vw" }}
                    type="submit"
                    onClick={() => {
                        setCompleted(true);
                        onSubmit(image);
                    }}
                    disabled={image == null}
                >
                    Submit
                </button>
                <p
                    style={{ fontSize: "10vh", color: "red", margin: "0px" }}
                    onClick={onExit}
                >
                    <b>X</b>
                </p>
            </div>
        </div>
    );
}

export default Task;
