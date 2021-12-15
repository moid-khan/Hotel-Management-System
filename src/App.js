import './App.css';
import { useDispatch } from 'react-redux';
import AppRouter from './config/routers';
import { useEffect } from 'react';
import { onAuthStateChanged,getAuth } from 'firebase/auth';
import { setUser } from './config/action';


function App() {

  // const {UserId} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const auth = getAuth();

  useEffect(() =>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
          dispatch(setUser(auth))
      }else{
        dispatch(setUser(null));
      }
  });
  },[]);
  


  return (
    <div className="App">
      <>
      <AppRouter/>
      </>
    </div>
  );
}



export default App;
