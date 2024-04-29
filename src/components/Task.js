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
                padding: "20px",
                backgroundColor: "#b08fff",
                opacity: completed ? "80%" : "100%",
                borderRadius: "30px",
                userSelect: "none",
                top: "10vh",
                position: "fixed",
                boxShadow: "0px 0px 15px white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontSize: "1.5em",
            }}
        >
            <h1 style={{ marginBottom: "0px", marginTop: "0" }}>{name}</h1>
            <p style={{ margin: "0px" }}>{description}</p>
            <input
                style={{ fontSize: "2vh", marginLeft: "auto", marginRight: "auto", marginTop: "10px", marginBottom: "10px", }}
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
                        style={{ margin: "20px", fontSize: "1em", borderRadius: "10vw", backgroundColor: "#003487", color: "white", fontFamily: "MuseoModerno" }}
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
