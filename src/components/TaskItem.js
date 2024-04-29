function TaskItem({ name, description, completed, onClick }) {
    return (
        <div
            style={{
                width: "80vw",
                backgroundColor: completed ? "#8ed9af" : "#26f080",
                borderRadius: "5vw",
                margin: "0px",
                marginTop: "2vh",
                userSelect: "none",
                color: completed ? "#444444" : "#000000",
            }}
            onClick={completed ? null : onClick}
        >
            <h1 style={{ marginTop: "0px" }}>{name}</h1>
            <p>{description}</p>
        </div>
    );
}

export default TaskItem;
