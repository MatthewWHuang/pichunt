import TaskItem from "./TaskItem";
import Task from "./Task";
import React, { useState } from "react";

function TaskList({ tasks, changeTask }) {
    const [activeTask, setActiveTask] = useState(null);
    const [activeTaskIndex, setActiveTaskIndex] = useState(null);
    const setCompleted = (index, newCompleted) => {
        changeTask(index, { ...tasks[index], completed: newCompleted });
    };
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            {tasks.map((task, i) => (
                <TaskItem
                    name={task.name}
                    description={task.description}
                    completed={task.completed}
                    onClick={() => {
                        setActiveTask(task);
                        setActiveTaskIndex(i);
                    }}
                    key={i}
                />
            ))}
            {activeTask ? (
                <Task
                    name={activeTask.name}
                    description={activeTask.description}
                    completed={activeTask.completed}
                    setCompleted={(newCompleted) =>
                        setCompleted(activeTaskIndex, newCompleted)
                    }
                    onSubmit={(image) => {
                        setActiveTask(null);
                    }}
                    onExit={() => setActiveTask(null)}
                />
            ) : null}
        </div>
    );
}

export default TaskList;
