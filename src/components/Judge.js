import { setWinner } from "../cloud/cloud";
import JudgeTask from "./JudgeTask";
import Present from "./Present";
import TaskItem from "./TaskItem";
import React, { useState, useEffect } from "react";

function Judge({ defaultTasks, gameID }) {
    const [tasks, setTasks] = useState(defaultTasks);
    const [tasksLoaded, setTasksLoaded] = useState(false);
    const [presenting, setPresenting] = useState(false);
    const [activeTask, setActiveTask] = useState(null);
    const [activeTaskIndex, setActiveTaskIndex] = useState(null);
    const changeTask = (index, newTask) => {
        const newTasks = [...tasks];
        newTasks[index] = newTask;
        setTasks(newTasks);
    };
    const setCompleted = (index, newCompleted) => {
        changeTask(index, { ...tasks[index], completed: newCompleted });
    };
    useEffect(() => {
        if (!tasksLoaded) {
            var loadedTasks = localStorage.getItem("PicHuntTasks");
            if (loadedTasks) {
                setTasks(JSON.parse(loadedTasks));
            }
            setTasksLoaded(true);
        } else if (tasks.length) {
            localStorage.setItem("PicHuntTasks", JSON.stringify(tasks));
        }
    }, [tasks]);
    useEffect(() => {
        if (defaultTasks.length) {
            setTasks(defaultTasks);
            localStorage.setItem("PicHuntTasks", JSON.stringify(defaultTasks));
        }
    }, [defaultTasks]);
    if (presenting) {
        return <Present gameID={gameID} />;
    }
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                paddingBottom: "10vh",
            }}
        >
            {activeTask ? (
                <JudgeTask
                    name={activeTask.name}
                    description={activeTask.description}
                    completed={activeTask.completed}
                    id={activeTask.id}
                    onExit={() => setActiveTask(null)}
                    onSubmit={(winner) => {
                        setWinner(gameID, activeTask.id, winner);
                        setCompleted(activeTaskIndex, true);
                        setActiveTask(null);
                    }}
                    gameID={gameID}
                />
            ) : (
                tasks.map((task, i) => (
                    <TaskItem
                        name={task.name}
                        description={task.description}
                        completed={task.completed}
                        onClick={() => {
                            setActiveTask(task);
                            setActiveTaskIndex(i);
                        }}
                        key={task.id}
                    />
                ))
            )}
            <div
                style={{
                    position: "fixed",
                    bottom: "0px",
                    boxShadow: "0px 0px 5px 5px white",
                    padding: "5px",
                    backgroundColor: "black",
                    paddingBottom: "0px",
                    width: "100%",
                    zIndex: "1",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <h1
                    style={{ color: "white", margin: "0px", cursor: "default" }}
                >
                    Judge
                </h1>
                {true || tasks.filter((task) => !task.completed).length == 0 ? (
                    <div
                        style={{
                            color: "white",
                            cornerRadius: "10px",
                            backgroundColor: "gray",
                            width: "max-content",
                            cursor: "pointer",
                            borderRadius: "5px",
                            marginLeft: "5px",
                            paddingLeft: "10px",
                            paddingRight: "10px",
                            fontSize: "2em",
                        }}
                    >
                        <p
                            style={{ margin: "0px" }}
                            onClick={() => setPresenting(true)}
                        >
                            Present Winners
                        </p>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default Judge;
