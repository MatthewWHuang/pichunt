import purpleSpace from "../purple-space.jpg";

function TaskItem({ name, description, completed, onClick }) {
    return (
        <div
            style={{
                width: "80vw",
                backgroundImage: `url(${purpleSpace})`,
                backgroundSize: "cover",
                opacity: completed ? "80%" : "100%",
                borderRadius: "30px",
                margin: "0px",
                marginTop: "2vh",
                padding: "10px",
                userSelect: "none",
                color: completed ? "#444444" : "#000000",
                boxShadow: "0px 0px 5px 5px gray",
            }}
            onClick={onClick}
        >
            <h1 style={{ marginTop: "0px", color: "white", fontSize: "3em" }}>
                {name}
            </h1>
            {/* <p style={{ color: "white", fontSize: "2em" }}>{description}</p> */}
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
