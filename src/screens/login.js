import React from 'react'
import { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { loginInitiate } from '../config/action';
import { Link } from "react-router-dom";
import './login.css';


const Login = () => {
    const [state,setState] = useState({
        email:"",
        password:"",
    })


    const {email,password} = state;

    const {currentUser} = useSelector((state) => state.user);

    const navigate = useNavigate();
    useEffect(() =>{
        
        if(currentUser){
            setState({email: "",password:""})
            // navigate('/');
        }
      
    },[currentUser,navigate]);

    const dispatch = useDispatch();


    const handleSubmit  = (e) => {  
        e.preventDefault();
        if(!email || !password){
            return;
        }
        else if (email === 'admin@gmail.com'){
            dispatch(loginInitiate(email,password));
            navigate('/dashboard');
        }
        else if (email != 'admin@gmail.com'){
            navigate('/')
        }
        
    };

    const handleChange = (e) => {
        let {name,value} = e.target;
        setState({...state,[name]:value})
     };


    return (
        <div>
            <div id="logreg-forms">
                <form className="form-signin" onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 font-weight-normal" style={{textAlign:"center"}}>
                        Login
                    </h1>
                    <input 
                    type="email"
                    id="inputEmail"
                    className="form-control mb-2"
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
                    <button className="btn btn-secondary btn-block" type='submit'>Login</button>
                    <hr/>
                    <p>Dont have account</p>
                    <Link to="/signup">
                    <button className="btn btn-primary btn-block" type='button' id='btn-login'>
                        <i className='fas fa-user-plus'></i> &nbsp;Sign up New Account
                    </button>
                    </Link>
                </form>

            </div>

        </div>
    )
}

export default Login