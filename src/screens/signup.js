import React from 'react'
import { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from "react-router-dom";
import { registerInitiate } from '../config/action';
import './signup.css';
import { onAuthStateChanged,getAuth } from 'firebase/auth';


const Signup = () => {
    const [state,setState] = useState({
        displayName:"",
        email:"",
        password:"",
        passwordConfirm:"",
    })

    const {email,password,displayName,passwordConfirm} = state;

    const {currentUser} = useSelector((state) => state.user);

    const auth = getAuth();

    const navigate = useNavigate();
    useEffect(() =>{
        if(currentUser){
            setState({email: "",displayName:"",password:"",passwordConfirm:""})
            // navigate('/dashboard');
            if(email == 'admin@gmail.com'){
                navigate('/dashboard');
            }
            else{
                navigate('/');
            }
        }
        // onAuthStateChanged(auth,(user)=>{
        //     if(user){
        //         navigate('/dashboard');
        //     }
        // })
    },[currentUser,navigate]);

    const dispatch = useDispatch();

    const handleSubmit  = (e) => {
        e.preventDefault();
        if(password !== passwordConfirm){
            return;
        }
        dispatch(registerInitiate(email,password,displayName))
    };

    const handleChange = (e) => {
       let {name,value} = e.target;
       setState({...state,[name]:value})
    };



    return (
        <div>
            <div id="register-form">
                <form className="form-signup" onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 font-weight-normal" style={{textAlign:"center"}}>
                        Sign Up
                    </h1>
                    <input 
                    type="text"
                    id="displayName"
                    className="form-control"
                    placeholder="Enter you Name"
                    name="displayName"
                    onChange={handleChange}
                    value={displayName}
                    required
                    />
                    <input 
                    type="email"
                    id="userEmail"
                    className="form-control"
                    placeholder="Enter your email"
                    name="email"
                    onChange={handleChange}
                    value={email}
                    required
                    />
                    <input 
                    type="password"
                    id="inputPassword"
                    className="form-control"
                    placeholder="Enter your password"
                    name="password"
                    onChange={handleChange}
                    value={password}
                    required
                    />
                    
                    <input 
                    type="password"
                    id="passwordConfirm"
                    className="form-control"
                    placeholder="Confirm your password"
                    name="passwordConfirm"
                    onChange={handleChange}
                    value={passwordConfirm}
                    required
                    />
                    <button className="btn btn-primary btn-block" type='submit'>Sign Up</button>
                    <Link to='/login'>
                        Already have account?
                    </Link>
                </form>
            </div>

        </div>
    )
}

export default Signup
