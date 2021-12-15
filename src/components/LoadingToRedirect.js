// import React,{useState,useEffect} from 'react'
// import { useNavigate } from 'react-router-dom'

// const LoadingToRedirect = () => {
//     const navigate = useNavigate();
//     const [count,setCount] = useState(5);

//     useEffect(() =>{
//         const intervel = setInterval(() =>{
//             setCount((currentCount)=> --currentCount);
//         },1000);

//         count === 0 && navigate('/login')
//         return()=> clearInterval(intervel);
//     },[count,navigate])

//     return (
//         <div>
//             <p>Redirecting you in {count} seconds</p>
//         </div>
//     )
// }

// export default LoadingToRedirect
