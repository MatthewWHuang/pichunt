import purpleSpace from "../purple-space.jpg";

function TaskItem({ name, description, completed, onClick }) {
    return (
        <div
            style={{
                width: "80vw",
                backgroundImage: `url(${purpleSpace})`,
                opacity: completed ? "80%" : "100%",
                borderRadius: "30px",
                margin: "0px",
                marginTop: "2vh",
                padding: "10px",
                userSelect: "none",
                color: completed ? "#444444" : "#000000",
            }}
            onClick={onClick}
        >
            <h1 style={{ marginTop: "0px", color: "white", }}>{name}</h1>
            <p style={{ color: "white", }}>{description}</p>
            <p
                style={{
                    visibility: completed ? "visible" : "hidden",
                    fontSize: "2em",
                    margin: "10px",
                }}
            >
                ✔️
            </p>
        </div>
    );
}

export default TaskItem;
