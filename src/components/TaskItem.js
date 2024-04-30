import purpleSpace from "../purple-space.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck, faSquare } from "@fortawesome/free-regular-svg-icons";

function TaskItem({ name, description, completed, onClick }) {
    return (
        <div
            style={{
                width: "90%",
                backgroundImage: `url(${purpleSpace})`,
                backgroundSize: "cover",
                // opacity: completed ? "80%" : "100%",
                borderRadius: "10px",
                margin: "0px",
                marginTop: "2vh",
                padding: "10px",
                userSelect: "none",
                color: completed ? "#444444" : "#000000",
                boxShadow: "0px 0px 3px 3px " + (completed ? "green" : "gray"),
                display: "flex",
                flexDirection: "row",
                textAlign: "left",
            }}
            onClick={onClick}
        >
            <p
                style={{
                    // visibility: completed ? "visible" : "hidden",
                    fontSize: "2em",
                    marginRight: "10px",
                    marginLeft: "5px",
                    color: completed ? "lightgreen" : "white",
                    width: "40px",
                    marginTop: "-8px",
                }}
            >
                {completed ? (
                    <FontAwesomeIcon icon={faSquareCheck} />
                ) : (
                    <FontAwesomeIcon icon={faSquare} />
                )}
            </p>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <h1
                    style={{
                        marginTop: "0px",
                        color: "white",
                        fontSize: "1.8em",
                        marginBottom: "5px",
                    }}
                >
                    {name}
                </h1>
                <p
                    style={{
                        color: "white",
                        fontSize: "1em",
                        margin: "0px",
                        maxLines: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    {description}
                </p>
            </div>
        </div>
    );
}

export default TaskItem;
