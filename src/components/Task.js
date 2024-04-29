import React, { useState, useRef } from "react";
import { uploadFile } from "../cloud/cloud";

function Task({
    name,
    description,
    completed,
    onSubmit,
    onExit,
    id,
    username,
    gameID,
}) {
    const [image, setImage] = useState(null);
    const [takingPicture, setTakingPicture] = useState(false);
    const videoRef = useRef(null);
    const onImageChanged = (e) => {
        setImage(e.target.files[0]);
    };
    const takePicture = () => {
        const video = videoRef.current;

        // Create a canvas to draw the video frame
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert the canvas image to a Blob
        canvas.toBlob((blob) => {
            setImage(blob);
            setTakingPicture(false);
            // // Create a download link for the user
            // const downloadLink = document.createElement("a");
            // downloadLink.download = "captured_image.png";
            // downloadLink.href = URL.createObjectURL(blob);
            // downloadLink.click();
        }, "image/png");
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
            <h1 style={{ marginBottom: "0px" }}>{name}</h1>
            <p style={{ margin: "0px" }}>{description}</p>
            <input
                style={{ fontSize: "2vh", marginLeft: "20vw" }}
                type="file"
                title="Upload Image"
                accept="image/*"
                onChange={onImageChanged}
            />
            <div style={{ display: "flex", flexDirection: "row" }}>
                <button
                    style={{ fontSize: "10vh", borderRadius: "1vw" }}
                    onClick={async () => {
                        const nowTakingPicture = !takingPicture;
                        setTakingPicture(!takingPicture);
                        if (nowTakingPicture) {
                            const stream =
                                await navigator.mediaDevices.getUserMedia({
                                    video: true,
                                });
                            videoRef.current.srcObject = stream;
                        } else {
                            videoRef.current.srcObject = null;
                        }
                    }}
                >
                    📷
                </button>
                {takingPicture ? (
                    <button
                        style={{ fontSize: "10vh", borderRadius: "1vw" }}
                        onClick={takePicture}
                    >
                        📸
                    </button>
                ) : null}
            </div>
            <video
                ref={videoRef}
                style={{
                    maxWidth: "70vw",
                    height: "30vh",
                    display: takingPicture ? "inline" : "none",
                }}
                autoPlay
                muted
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
                        style={{ fontSize: "10vh", borderRadius: "1vw" }}
                        type="submit"
                        onClick={() => {
                            uploadFile(image, gameID, id, username);
                            onSubmit(image);
                        }}
                        disabled={image == null}
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

export default Task;
