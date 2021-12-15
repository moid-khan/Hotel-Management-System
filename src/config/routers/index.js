import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRoute from "../../components/UserRoute";
import { Home, Dashboard, Login, Signup } from "./appRouter";
import Routers from "../../components/Routers";

export default function AppRouter() {


    return (

        <>
            <Router>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                </Routes>
            </Router>


        </>

    )
}