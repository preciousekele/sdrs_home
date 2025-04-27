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
        password: '',
        role: 'user'
    })
    const navigate  = useNavigate()

    const handleChanges = (e) => {
        const { name, value, type, checked } = e.target;
    
        setValues((prevValues) => ({
            ...prevValues,
            [name]: type === "radio" ? value : checked ? value : prevValues[name]
        }));
    };    
    //function to handle form submission
    const handleSubmit =  async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:3000/auth/register', values)
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
                <div>
                    <div className='role-selection'>
                    <label className='role'>Role</label>
                        <input type="radio" id="user" name="role" value="user"  checked={values.role === "user"}  onChange={handleChanges} required /> <label htmlFor="user">User</label>
                        <input type="radio" id="admin" name="role" value="admin"  checked={values.role === "admin"}  onChange={handleChanges} required /> <label htmlFor="admin">Admin</label>
                    </div>
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
