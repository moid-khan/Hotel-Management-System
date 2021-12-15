import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import Menu from '../components/menu'
import { logoutInitiate } from '../config/action';
import Slider from '../components/slider'
import { Col, Container, Row } from 'react-bootstrap';
import HotelCard from '../components/HotelCard';
import { getDatabase, ref, onValue } from "firebase/database";


const Home = () => {


    const [dbData, setData] = useState([])

    const db = getDatabase();

    const getDataFromFirebase = () => {
        const starCountRef = ref(db, 'hotels/');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            setData(data)
            console.log(data);
        });
    }

    useEffect(() => {
        getDataFromFirebase()


    }, [])





    const { currentUser } = useSelector((state) => state.user);

    const getData = () => {
        console.log(dbData);
    }



    useEffect(() => {
        console.log(currentUser);
    }, [])



    const dispatch = useDispatch();


    const handleAuth = () => {
        // if(currentUser){
        dispatch(logoutInitiate())


        // }
    }


    return (
        <div>

            <Menu />
           <Slider />
            <h1 align="center">
                Home Page
            </h1>
            {/* <button className="btn btn-secondary btn-block mt-4" onClick={handleAuth} type='button'>Logout</button> */}
            <Container class="mt-4">
                <Row>
                    {
                        dbData.map((item, index) => {
                            // console.log(item);
                            return (
                                <Col lg={4} md={6} sm={12} key={index} >
                                    <HotelCard title={item.hotelName} rooms={item.hotelRooms} price={item.hotelPrice} imgSrc={item.hotelImg} />
                                </Col>
                            )
                        })
                    }

                </Row>
            </Container>
            <button onClick={getData}>Get Data</button>

            <button className="btn btn-secondary btn-block mt-4" onClick={handleAuth} type='button'>Logout</button>

        </div>

    )
}

export default Home
