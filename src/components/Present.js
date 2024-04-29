import { loadGame } from "../cloud/cloud";
import PresentTask from "./PresentTask";
import TaskItem from "./TaskItem";
import React, { useState, useEffect } from "react";

function Present({ gameID }) {
    const [tasks, setTasks] = useState([]);
    const [activeTask, setActiveTask] = useState(null);
    const [activeTaskIndex, setActiveTaskIndex] = useState(null);
    useEffect(() => {
        loadGame(gameID).then(setTasks);
    }, []);
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
                <PresentTask
                    name={activeTask.name}
                    description={activeTask.description}
                    completed={activeTask.completed}
                    id={activeTask.id}
                    onExit={() => setActiveTask(null)}
                    onSubmit={(winner) => {
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

export default Present;
