// import logo from './logo.svg';
// import './App.css';
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useState, useEffect } from "react"
import Header from "./components/Header"
import Footer from './components/Footer'
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"
import About from './components/About'


function App() {

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async() =>{
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  },[])

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

const [showAddTask, setShowAddTask] = useState(false)

const addTask = async (task) => {

  const res = await fetch("http://localhost:5000/tasks", {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(task),
  })

  const data = await res.json()

  setTasks([...tasks, data])

  // const id = Math.floor(Math.random() * 10000) + 1

  // const newTask = {id,...task}

  // setTasks([...tasks, newTask])
}

const deleteTask = async (id) => {

  await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'DELETE',
  })

  setTasks(tasks.filter((task) => task.id !== id))
}

const toggleReminder = async (id) => {
  const taskToBeUpdated = await fetchTask(id)

  const updatedTask = {...taskToBeUpdated, reminder:!taskToBeUpdated.reminder}

  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method:"PUT",
    headers:{
      "Content-type": "application/json"
    },
    body: JSON.stringify(updatedTask)
  })

  const data = await res.json()

  setTasks(tasks.map((task) => task.id === id ? ({...task, reminder:data.reminder}) : task))
}

  return (
    <Router>
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      <Route path='/' exact render={(props) => (
        <>
          {showAddTask && <AddTask onAdd={addTask}/>}
          {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>) : ("No Tasks to show")}        
        </>
      )}/>
      <Route path='/about' component={About}/>
      <Footer />

    </div>
    </Router>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
