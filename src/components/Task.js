import React, { useState } from "react";
import { uploadFile } from "../cloud/upload";

function Task({
    name,
    description,
    completed,
    setCompleted,
    onSubmit,
    onExit,
    id,
}) {
    const [image, setImage] = useState(null);
    const onImageChanged = (e) => {
        setImage(e.target.files[0]);
    };
    return (
        <div
            style={{
                width: "80vw",
                padding: "20px",
                backgroundColor: "#b08fff",
                opacity: completed ? "80%" : "100%",
                borderRadius: "30px",
                userSelect: "none",
                top: "10vh",
                position: "fixed",
                margin: "0px",
                boxShadow: "0px 0px 15px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontSize: "1.5em",
            }}
        >
            <h1 style={{marginTop: "0"}}>{name}</h1>
            <p>{description}</p>
            <input
                style={{ fontSize: "2vh", marginLeft: "auto", marginRight: "auto" }}
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
            {completed ? null : (
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <button
                        style={{ margin: "20px", fontSize: "1em", borderRadius: "10vw", backgroundColor: "#003487", color: "white", fontFamily: "MuseoModerno" }}
                        type="submit"
                        onClick={() => {
                            setCompleted(true);
                            uploadFile(image, "0", id, "admin");
                            onSubmit(image);
                        }}
                        disabled={image == null}
                    >
                        Submit
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
            )}
        </div>
    );
}

export default Task;
