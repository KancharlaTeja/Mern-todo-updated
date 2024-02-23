import React, { useEffect, useState } from 'react';
import './todo.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Todo() {
    const data = useParams();
    const email = data.email;
    const navigate = useNavigate();
    const [input, updateInp] = useState('');
    const [todoList, updateTodo] = useState([]);
    const [showbut, updateshowbut] = useState(false);
    const [title, updateTitle] = useState('')

    async function createNewTodo() {
        if (input === '') {
            alert("Please Add Task....!");
            return;
        } else {
            try {

                const response = await axios.post('http://localhost:8000/add-task', { email, input });
                const responseData = response.data

                if (responseData && responseData.status === 'success') {
                    const newTodos = responseData.new_list;
                    updateTodo(newTodos);
                    updateTitle(responseData.user_name)
                    alert("Task Added Successfully")
                    updateInp('');
                } else if (responseData.status === 'sorry') {
                    alert('User not found');
                } else {
                    alert('Error adding task!')
                }
            } catch (error) {
                console.error("Error adding task:", error);
                alert('Error in adding a task');
            }
        }
    }
    useEffect(()=>{
    async function getData(){
        try {
            const response = await axios.post('http://localhost:8000/get-data', { email })
            const responseData = response.data
            if (responseData.status === 'success')
             {
                updateTitle(responseData.todo_user)
                const new_to = responseData.todoList;
                if (new_to.length > 0)
                   {updateTodo(new_to) }
            }

            else if (responseData.status === 'notasks')
             {
                alert("There is no todos....!")
             }
            else if (responseData.status === 'nodata')
             {
                alert('User not found in the database')
             }
            else {
                alert('Sorry Teja')
             }
         }
         catch (e) {
            console.log(e)
          }
      }
    getData();
        },[email])

    function toggleshow() {
        updateshowbut(!showbut)


    }

    async function deletetodo(deleteTask) {
        try {
            const deletedResponse = await axios.post('http://localhost:8000/delete-task', { email, deleteTask })
            const delResponse = deletedResponse.data;
            if (delResponse.status === 'success') {
                const delNewlist = delResponse.afterDel;
                updateTodo(delNewlist);
            }
        }
        catch (e) {
            console.log(e)
        }


    }
    function Display() {

        return (
            <ul className='list-group'>

                {todoList.map((item, index) => (<>
                    <ul key={index} className='satish'>{item}
                        <button onClick={() => deletetodo(item)
                        } style={{ border: 'none', borderRadius: '6px', marginRight: '6px' }}>❌</button></ul></>
                ))}
                {(todoList.length === 0) && <><br /><br /><p className='self' >Hey {title}....! There are No Tasks</p></>}

            </ul>)
    }
    function Logout() {
        navigate('/')

    }

    return (
        <>
            <div style={{
                width: '360px',
                padding: '15px 5px', // Reduced padding for top and bottom
                backgroundColor: 'lightgray',
                border: '2px solid black',
                borderRadius: '8px',
                margin: '0 auto', // to center horizontally
                marginTop: '50px'
            }}>
                <h3 style={{ textAlign: 'center', color: 'blue' }}>Welcome {title}...!</h3>
            </div>
            <div className='container  w-50'>
                <div className='input-group'>
                    <input className='form-control mt-5' type="text" onChange={(e) => updateInp(e.target.value)} value={input} />
                    <button onClick={createNewTodo} className='btn-btn-primary mt-5' style={{ background: 'green', color: "white", border: 'none' }}>
                        Add
                    </button>

                    <button onClick={toggleshow} className='btn-btn-primary mt-5' style={{ background: 'blue', color: "white", border: 'none', marginLeft: '20px', borderRadius: '10px' }}>{showbut ? "hide Tasks" : "Show Tasks"}</button>
                    <button onClick={Logout} className='btn-btn-primary mt-5' style={{ background: 'yellow', color: "red", border: 'none', marginLeft: '20px', borderRadius: '10px' }}>Logout</button>

                </div>


                {showbut && <Display />}

            </div>
        </>
    );
}

export default Todo;
