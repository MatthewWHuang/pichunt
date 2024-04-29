import React, { useState, useRef, useEffect } from "react";
import { uploadFile, downloadFile, getFileRef } from "../cloud/cloud";

import darkSwirls from "../dark-swirls.jpg";

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
    const [image, setImage] = useState(getFileRef(gameID, id, username));
    const [imageURL, setImageURL] = useState(null);
    const [takingPicture, setTakingPicture] = useState(false);
    const [changed, setChanged] = useState(false);
    const videoRef = useRef(null);
    const onImageChanged = (e) => {
        setImage(e.target.files[0]);
        setImageURL(URL.createObjectURL(e.target.files[0]));
        setChanged(true);
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
            setImageURL(URL.createObjectURL(blob));
            setTakingPicture(false);
            setChanged(true);
        }, "image/png");
    };
    useEffect(() => {
        downloadFile(image)
            .then((url) => setImageURL(url))
            .catch((url) => {});
    }, []);
    return (
        <div
            style={{
                width: "80vw",
                maxHeight: "80vh",
                padding: "20px",
                backgroundImage: `url(${darkSwirls})`,
                backgroundSize: "cover",
                borderRadius: "30px",
                userSelect: "none",
                top: "2vh",
                position: "fixed",
                boxShadow: "0px 0px 15px white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontSize: "1.5em",
                overflow: "scroll",
                zIndex: "2",
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
            <p
                style={{
                    margin: "0px",
                    color: "white",
                    fontSize: "1.5em",
                    maxWidth: "75vw",
                }}
            >
                {description}
            </p>
            <div
                style={{
                    fontSize: "2vh",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "10px",
                    marginBottom: "10px",
                }}
            >
                <label htmlFor="camera">
                    {imageURL ? (
                        <div>
                            <img
                                style={{ maxWidth: "70vw", height: "30vh" }}
                                src={imageURL}
                            />

                            <p style={{ margin: "0px", fontSize: "3vh" }}>
                                <i>Click to change</i>
                            </p>
                        </div>
                    ) : (
                        <div
                            style={{
                                display: "inline-block",
                                cursor: "pointer",
                                border: "5px solid black",
                                backgroundColor: "gray",
                                borderRadius: "5px",
                            }}
                        >
                            <p style={{ fontSize: "20vh", margin: "0" }}>📷</p>
                        </div>
                    )}
                </label>
                <input
                    style={{ display: "none" }}
                    type="file"
                    title="Upload Image"
                    accept="image/*"
                    onChange={onImageChanged}
                    capture="environment"
                    id="camera"
                />
            </div>
            {/* <div style={{ display: "flex", flexDirection: "row" }}>
                <button
                    style={{ fontSize: "10vh", borderRadius: "1vw" }}
                    onClick={async () => {
                        const nowTakingPicture = !takingPicture;
                        setTakingPicture(!takingPicture);
                        if (nowTakingPicture) {
                            const stream =
                                await navigator.mediaDevices.getUserMedia({
                                    video: { facingMode: "environment" },
                                });
                            videoRef.current.srcObject = stream;
                        } else {
                            videoRef.current.srcObject = null;
                        }
                    }}
                >
                    {takingPicture ? "X" : "📷"}
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
                    display: takingPicture ? "block" : "none",
                }}
                autoPlay
                muted
                playsInline
            /> */}
            {/* {imageURL ? (
                <img
                    style={{ maxWidth: "70vw", height: "30vh" }}
                    src={imageURL}
                />
            ) : null} */}

            <div style={{ display: "flex", flexDirection: "row" }}>
                <button
                    style={{
                        margin: "20px",
                        fontSize: "1em",
                        borderRadius: "10vw",
                        backgroundColor: "#003487",
                        color: "white",
                        fontFamily: "MuseoModerno",
                    }}
                    type="submit"
                    onClick={() => {
                        uploadFile(image, gameID, id, username);
                        onSubmit(image);
                    }}
                    disabled={imageURL == null || !changed}
                >
                    {completed ? "Update" : "Submit"}
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

export default Task;
