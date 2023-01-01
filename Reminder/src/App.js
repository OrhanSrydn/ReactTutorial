import Header from './components/Header'
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import { useState, useEffect } from 'react';

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  {
  }
  const[task, setTasks] = useState([])

  useEffect (() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }


    getTasks()
  }, [])

  //Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

//Delete Task
const deleteTask = async(id) => {
await fetch(`http://localhost:5000/tasks/${id}`, {
  method: 'DELETE',
})

  setTasks(task.filter((task) => task.id !== id))
}

//Toggle Reminder

const toggleReminder = (id) => {
  setTasks(task.map((task) => task.id === id ? {...task, reminder: !task.reminder} : task))
}

//Add Task

const addTask = async(task) => {
  const res = await fetch('http://localhost:5000/tasks',{
    method:'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(task),
  })

  const data = await res.json()

  setTasks([...task,data])




  // const id = Math.floor(Math.random() * 10000) + 1
  // const newTask = {id, ...tasks}
  // setTasks([...task, newTask])
}


  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} 
      showAdd={showAddTask}/>
      {showAddTask && <AddTask onAdd = {addTask}/>}
      {task.length > 0 ? (<Tasks task={task} 
      onDelete={deleteTask} onToggle={toggleReminder}/>) : ('No Tasks To Show')}
    </div>
  );
}


export default App;
