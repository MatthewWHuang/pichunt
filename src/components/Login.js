import React, { useState } from "react";

function Login({ onSubmit }) {
    const [username, setUsername] = useState("");
    const onUsernameChanged = (e) => {
        console.log(e.target.value);
        setUsername(e.target.value);
    };
    return (
        <div
            style={{
                width: "80vw",
                height: "70vh",
                backgroundColor: "#0fc8c0",
                borderRadius: "5vw",
                userSelect: "none",
                top: "15vh",
                left: "10vw",
                position: "fixed",
                margin: "0px",
                boxShadow: "0px 0px 15px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "1vh",
                }}
            >
                <label
                    htmlFor="username"
                    style={{ margin: "1vh", fontSize: "5vw" }}
                >
                    Enter Username:{" "}
                </label>
                <input
                    style={{
                        width: "50vw",
                        height: "20vh",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        fontSize: "10vw",
                        fontFamily: "'MuseoModerno', sans-serif",
                        fontWeight: "500",
                        outline: "none",
                    }}
                    placeholder="Username"
                    type="text"
                    id="username"
                    autoComplete="off"
                    onChange={onUsernameChanged}
                />
            </div>
            <button
                style={{
                    fontSize: "10vh",
                    borderRadius: "1vw",
                    fontFamily: "'MuseoModerno', sans-serif",
                    fontWeight: "500",
                    borderColor: "transparent"
                }}
                onClick={(e) => {
                    onSubmit(username);
                }}
            >
                Submit
            </button>
        </div>
    );
}

export default Login;
