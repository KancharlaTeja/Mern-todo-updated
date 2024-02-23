import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
    let navigate = useNavigate();
    
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    async function submit(e) {
        e.preventDefault();
console.log(email)
console.log(password)
const response = await axios.post("http://localhost:8000/", { email, password });
        const responseData = response.data;

        if (responseData.status === 'success') {
            alert("Login Successful....!")
            navigate(`/add-task/${email}`)
        }
        else if (responseData.status === 'notsignup') {
            alert("Please Signup");
            navigate('/signup')
        }
        else if (responseData.status === 'incorrectpassword') {
            alert("Wrong Password...Please try again")
        }
        else {
            alert("Invalid credintials")
        }



    }

    return (
        <div className="login">
            <h1 style={{backgroundColor:'lightgreen',color:'red',textAlign:'center',width :'220px',marginLeft:'70px',height:'48x' ,padding:'6px 7px'}}>Login Form</h1>
            <br /> 
            <label>Enter Email :</label>
            <input type='email' onChange={(e) => setemail(e.target.value)} placeholder="Email" />
            <br /> <br />
            <label>Enter Password :</label>
            <input type="password" onChange={(e) => setpassword(e.target.value)} placeholder="Password" />
            <br /> <br />
            <button style={{ backgroundColor: 'blue', color: 'white' ,alignContent:'center' ,marginLeft:'110px',alignItems:'center',border:'none',borderRadius:'4px'}} onClick={submit}>Login
            </button>
            
        </div>
    );
}

export default Login;





