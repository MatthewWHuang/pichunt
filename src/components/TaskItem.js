function TaskItem({ name, description, completed, onClick }) {
    return (
        <div
            style={{
                width: "80vw",
                backgroundColor: "#b08fff",
                opacity: completed ? "80%" : "100%",
                borderRadius: "30px",
                margin: "0px",
                marginTop: "2vh",
                padding: "10px",
                userSelect: "none",
                color: completed ? "#444444" : "#000000",
                boxShadow: "0px 0px 5px 5px",
            }}
            onClick={onClick}
        >
            <h1 style={{ marginTop: "0px", fontSize: "3em" }}>{name}</h1>
            <h2 style={{ fontSize: "2em" }}>{description}</h2>
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
