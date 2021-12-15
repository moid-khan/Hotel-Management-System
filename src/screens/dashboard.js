import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { logoutInitiate } from '../config/action';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import {db,set,ref} from '../firebase';




const Dashboard = () => {

    const [hotelName, setHotelName] = useState("")
    const [hotelId, setHotelId] = useState("")
    const [hotelImg, setHotelImg] = useState("")
    const [hotelRooms, setHotelRooms] = useState("")
    const [hotelPrice, setHotelPrice] = useState("")

    const { currentUser } = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const auth = getAuth();
    const navigate = useNavigate();


    console.log(currentUser);

    useEffect(() => {
        if (currentUser == null) {
            navigate('/');
        }

        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/dashboard');
            }
        })
    }, [currentUser, navigate]);

    const handleAuth = () => {
        if (currentUser) {
            dispatch(logoutInitiate())

        }
    }

 

    const insertHotel = (e) => {
        e.preventDefault();
        let obj = {
            hotelName,
            hotelImg,
            hotelRooms,
            hotelPrice
        }

        const refrence = ref(db,`/hotels/${hotelId}`);
            set(refrence,obj).then(() =>{
                alert("Data Inserted Successfully")
            }).catch((error)=>{
                console.log(error);
            });

    }



    return (
        <div>
            <h2>Dashboard</h2>

            <Container>
                <Row>
                    <Col lg={4} className="mx-auto">
                        <Form onSubmit={insertHotel} className="rounded border p-4">

                            <Form.Group className="mb-3" >
                                <Form.Label>Hotel No</Form.Label>
                                <Form.Control onChange={(e) => setHotelId(e.target.value)} type="text" placeholder="Enter Hotel No" />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Hotel Name</Form.Label>
                                <Form.Control onChange={(e) => setHotelName(e.target.value)} type="text" placeholder="Enter Hotel Name" />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Hotel Image Source</Form.Label>
                                <Form.Control onChange={(e) => setHotelImg(e.target.value)} type="text" placeholder="Enter Image Source" />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>No. of Rooms</Form.Label>
                                <Form.Control onChange={(e) => setHotelRooms(e.target.value)} type="text" placeholder="Enter Rooms" />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Price</Form.Label>
                                <Form.Control onChange={(e) => setHotelPrice(e.target.value)} type="text" placeholder="Enter Price" />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Insert Hotel
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <button className="btn btn-secondary btn-block mt-4" onClick={handleAuth} type='button'>Logout</button>
        </div>
    )
}

export default Dashboard
