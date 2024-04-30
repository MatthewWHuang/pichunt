import TaskItem from "./TaskItem";
import Task from "./Task";
import React, { useState, useEffect } from "react";

function TaskList({ username, defaultTasks, gameID }) {
    const [tasks, setTasks] = useState(defaultTasks);
    const [tasksLoaded, setTasksLoaded] = useState(false);
    const changeTask = (index, newTask) => {
        const newTasks = [...tasks];
        newTasks[index] = newTask;
        setTasks(newTasks);
    };
    const [activeTask, setActiveTask] = useState(null);
    const [activeTaskIndex, setActiveTaskIndex] = useState(null);
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
        }
    }, [defaultTasks]);

    const playerFooter = () => {
        return (
            <div style={{ marginTop: "20px" }}>
                <h1 style={{ margin: "5px" }}>PicHunt</h1>
                <p style={{ margin: "5px", marginBottom: "10px" }}>
                    You're playing {gameID}. Logged in as <i>{username}</i>.
                </p>
            </div>
        );
    };
    const stickyFooter = () => {
        return (
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
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <h1 style={{ margin: "5px" }}>
                        {tasks.filter((task) => task.completed).length}/
                        {tasks.length} Completed
                    </h1>
                    <div
                        style={{
                            height: "5vh",
                            width: "20vw",
                            backgroundColor: "white",
                            padding: "0px",
                            borderRadius: "5px",
                            marginLeft: "5px",
                        }}
                    >
                        <div
                            style={{
                                height: "5vh",
                                width:
                                    Math.round(
                                        20 *
                                            (tasks.filter(
                                                (task) => task.completed
                                            ).length /
                                                tasks.length)
                                    ).toString() + "vw",
                                backgroundColor: "green",
                                padding: "0px",
                                borderRadius: "5px",
                                boxShadow:
                                    tasks.filter((task) => task.completed)
                                        .length == tasks.length
                                        ? "0px 0px 10px 5px green"
                                        : "",
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    };
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                color: "white",
                paddingBottom: "10vh",
            }}
        >
            {activeTask ? (
                <Task
                    name={activeTask.name}
                    description={activeTask.description}
                    completed={activeTask.completed}
                    setCompleted={(newCompleted) =>
                        setCompleted(activeTaskIndex, newCompleted)
                    }
                    onSubmit={(image) => {
                        setCompleted(activeTaskIndex, true);
                        setActiveTask(null);
                    }}
                    onExit={() => setActiveTask(null)}
                    id={activeTask.id}
                    username={username}
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
            {playerFooter()}
            {stickyFooter()}
        </div>
    );
}

export default TaskList;
