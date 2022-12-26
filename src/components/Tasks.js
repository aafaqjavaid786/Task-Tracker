import React from 'react'
import Task from "./Task"

const Tasks = ({tasks, onDelete, onToggle}) => {
    
  return (
    // setTasks([...tasks, {}])
    <>
      {/* {tasks.map((tasks) => (<h3 key={tasks.id}>{tasks.text}</h3>))} */}
      {tasks.map((task) => (<Task key={task.id} task = {task} onDelete={onDelete} onToggle={onToggle}/>))}
    </>
  )
}

export default Tasks