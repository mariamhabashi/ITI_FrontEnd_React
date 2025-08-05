import React from 'react'
import { useState } from 'react'
import './List.css'
export default function List() {
     const [tasks, setTasks] = useState([
    { id: 1, text: 'Finish HTML', completed: false },
    { id: 2, text: 'HTML project', completed: true },
    { id: 3, text: 'Integrated with CSS', completed: false },
    { id: 4, text: 'Build the logic', completed: false }
  ])
  const [newTask, setNewTask] = useState('')
  const [error, setError] = useState('')

  const addTask = () => {
    if (newTask.trim().length < 5) {
      setError('Task must be minimum 5 characters')
      return
    }
    
    const task = {
      id: Date.now(),
      text: newTask.trim(),
      completed: false
    }
    
    setTasks([...tasks, task])
    setNewTask('')
    setError('')
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask()
    }
  }

  return (
    <>
    <div className="app">
      <div className="todo-container">
        <div className="input-section">
          <div className="input-container">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Create new task"
              className="task-input"
            />
            <button onClick={addTask} className="add-btn">
              Add
            </button>
          </div>
          {error && <div className="error-message">{error}</div>}
        </div>

        <div className="tasks-list">
          {tasks.map(task => (
            <div key={task.id} className="task-item">
              <div className="task-content">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="task-checkbox"
                />
                <span className={task.completed ? 'task-text completed' : 'task-text'}>
                  {task.text}
                </span>
              </div>
              <button 
                onClick={() => deleteTask(task.id)}
                className="delete-btn"
              >
                <i class="fa-solid fa-check"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
    <script src="https://kit.fontawesome.com/8f47cb5a61.js" crossorigin="anonymous"></script>
    </>
  )
}
