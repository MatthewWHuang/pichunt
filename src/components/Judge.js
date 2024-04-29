import { setWinner } from "../cloud/cloud";
import JudgeTask from "./JudgeTask";
import TaskItem from "./TaskItem";
import React, { useState, useEffect } from "react";

function Judge({ defaultTasks, gameID }) {
    const [tasks, setTasks] = useState(defaultTasks);
    const [tasksLoaded, setTasksLoaded] = useState(false);
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
        } else {
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
            }}
        >
            <h1 style={{ color: "white" }}>Judge</h1>
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
        </div>
    );
}

export default Judge;
