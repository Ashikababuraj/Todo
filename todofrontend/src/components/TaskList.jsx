import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios';

function TaskList() {

   const[tasks, setTasks] = useState([]);
   const[newTask, setNewTask] = useState("")

   useEffect(() => {
        fetchTasks();
   }, [])

   const fetchTasks = async() => {
    try{
        const response = await axios.get("http://127.0.0.1:8000/api/tasks/");
        setTasks(response.data)
    }
    catch(error){
            console.error("Error fetching tasks", error)
    }
   };

   const addTask = async () => {
    if (!newTask.trim()) return;
    try {
        await axios.post('http://127.0.0.1:8000/api/tasks/', { task: newTask, completed: false });
        setNewTask('');
        fetchTasks();
    } catch (error) {
        console.error("Error adding task:", error);
    }
};

const toggleCompletion = async (task) => {
    try {
        await axios.put(`http://127.0.0.1:8000/api/tasks/${task.id}/`, {
            ...task,
            completed: !task.completed,
        });
        fetchTasks();
    } catch (error) {
        console.error("Error toggling completion:", error);
    }
};

const deleteTask = async (taskId) => {
    try {
        await axios.delete(`http://127.0.0.1:8000/api/tasks/${taskId}/`);
        fetchTasks();
    } catch (error) {
        console.error("Error deleting task:", error);
    }
};

  return (
    <>
    <div className='todo text-center pt-120'>
      <div className='container'>
      <h2 className='mb-5'>Todo List</h2>
      <div className='row justify-content-center'>
        <div className='col-md-6'><input type='text' value={newTask} className='form-control' placeholder='Enter Task' onChange={(e) => setNewTask(e.target.value)} /> </div>
        <div className='col-md-1'><button className='btn btn-primary' onClick={addTask}>Add</button></div>
      </div>
<br/><br/><br />

      <h5>View Tasks</h5>
      <div className='row justify-content-center'>
        <div className='col-md-7'>
        
        
        
        <table className="table table-bordered">
    <thead>
        <tr>
            <th>ID</th>
            <th>Task</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        {tasks.length === 0 ? (
            <tr>
                <td colSpan="3" style={{ textAlign: 'center' }}>
                    No recent tasks.
                </td>
            </tr>
        ) : (
            tasks.map((task, index) => (
                <tr key={task.id}>
                    <td>{index + 1}</td>
                    <td>
                        <span
                            style={{
                                textDecoration: task.completed ? "line-through" : "none",
                                cursor: "pointer",
                            }}
                            onClick={() => toggleCompletion(task)}
                        >
                            {task.task}
                        </span>
                    </td>
                    <td>
                        <button
                            onClick={() => toggleCompletion(task)}
                            className={`me-3 btn ${task.completed ? 'btn-success' : 'btn-warning'}`}
                        >
                            {task.completed ? "Completed" : "Mark as Complete"}
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={() => deleteTask(task.id)}
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))
        )}
    </tbody>
</table>



        </div>
      </div>


      </div>
      </div>
    </>
  )
}

export default TaskList