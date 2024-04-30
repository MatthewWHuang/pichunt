import React, { useState, useRef, useEffect } from "react";
import { uploadFile, downloadFile, getFileRef } from "../cloud/cloud";
import TaskHolder from "./TaskHolder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

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
        <TaskHolder name={name} description={description} onExit={onExit}>
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
                                borderRadius: "50%",
                                padding: "5vh",
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faCamera}
                                style={{ height: "20vh", margin: "0px" }}
                            />
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
            </div>
        </TaskHolder>
    );
}

export default Task;
