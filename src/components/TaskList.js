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
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                color: "white",
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

            <div
                style={{
                    position: "fixed",
                    bottom: "0px",
                    boxShadow: "0px 0px 5px 5px",
                    padding: "5px",
                    backgroundColor: "black",
                    paddingBottom: "0px",
                    width: "100%",
                    zIndex: "1",
                }}
            >
                <h1 style={{ margin: "5px" }}>PicHunt</h1>
                <h2 style={{ margin: "5px", marginBottom: "10px" }}>
                    You're playing {gameID}. Logged in as <i>{username}</i>.
                </h2>
            </div>
        </div>
    );
}

export default TaskList;