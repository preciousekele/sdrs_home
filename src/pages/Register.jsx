import React, {useState} from 'react';
import './Register.css'; 
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Register = () => {
    //function to handle form input changes
    const[values, setValues] = useState({
        username: '',
        email: '',
        password: ''
    })
    const navigate  = useNavigate()

    const handleChanges = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }
    //function to handle form submission
    const handleSubmit =  async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:3000/auth/register', values)
            // console.log(response);
            if(response.status === 201) {
                navigate('/login')
            }                                                   
        } catch(err) {
            console.log(err)
        }
    }

  return (
    <div className="register-container">
        <div className="register-form">
            <form onSubmit={handleSubmit}>
                <h4>Register</h4>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" placeholder="Enter Username" name= "username" onChange={handleChanges}/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Enter Email" name= "email" onChange={handleChanges} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter Password" name= "password" onChange={handleChanges}/>
                </div>
                <button type="submit">Sign Up</button>
            </form>
            <div className="login-link">
                <p>Already have an account?</p>
                <Link to="/login">Login</Link>
            </div>
        </div>
    </div>
  );
}

export default Register;
