import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { logoutInitiate } from '../config/action';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { db, set, ref, remove } from '../firebase';
import MenuNavbar from '../components/menu';
import { getDatabase, onValue } from "firebase/database";





const Dashboard = () => {

    const [hotelId, setHotelId] = useState("")
    const [hotelName, setHotelName] = useState("")
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

        const refrence = ref(db, `/hotels/${hotelId}`);
        set(refrence, obj).then(() => {
            alert("Data Inserted Successfully")
        }).catch((error) => {
            console.log(error);
        });

    }

    //Getting Data from Firebase
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


    const edit = (id, obj) => {
        setHotelId(id)
        setHotelName(obj.hotelName)
        setHotelImg(obj.hotelImg)
        setHotelRooms(obj.hotelRooms)
        setHotelPrice(obj.hotelPrice)
    }

    const deleteHotel = (id) => {
        const refrence = ref(db, `/hotels/${id}`)
        remove(refrence)
    }


    return (
        <div>

            <MenuNavbar />

            <h2 className="p-3 my-3 bg-secondary text-white">Dashboard</h2>
            <h3 className="p-3 my-3 ">Hotes</h3>

            <Container>
                <Row>
                    <Col lg={4} sm={12}>
                        <Form onSubmit={insertHotel} className="rounded border p-4">

                            <Form.Group className="mb-3" >
                                <Form.Label>Hotel No</Form.Label>
                                <Form.Control value={hotelId} onChange={(e) => setHotelId(e.target.value)} type="text" placeholder="Enter Hotel No" />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Hotel Name</Form.Label>
                                <Form.Control value={hotelName}  onChange={(e) => setHotelName(e.target.value)} type="text" placeholder="Enter Hotel Name" />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Hotel Image Source</Form.Label>
                                <Form.Control value={hotelImg}  onChange={(e) => setHotelImg(e.target.value)} type="text" placeholder="Enter Image Source" />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>No. of Rooms</Form.Label>
                                <Form.Control value={hotelRooms}  onChange={(e) => setHotelRooms(e.target.value)} type="text" placeholder="Enter Rooms" />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Price</Form.Label>
                                <Form.Control value={hotelPrice}  onChange={(e) => setHotelPrice(e.target.value)} type="text" placeholder="Enter Price" />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Insert Hotel
                            </Button>
                        </Form>
                    </Col>
                    <Col lg={8} sm={12}>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Hotel Name</th>
                                    <th>Hotel Price</th>
                                    <th>Hotel Rooms</th>
                                    <th>Hotel Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    dbData ? dbData.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index}</td>
                                                <td>{item.hotelName}</td>
                                                <td>{item.hotelPrice}</td>
                                                <td>{item.hotelRooms}</td>
                                                <td>{item.hotelImg}</td>
                                                <td>
                                                    <Button size="sm" onClick={() => { edit(index, item) }}>Edit</Button>
                                                    <Button size="sm" onClick={()=> {deleteHotel(index)}} variant="danger" style={{ marginTop: "5px" }} >Delete</Button>
                                                </td>
                                            </tr>
                                        )
                                    }) : (<h3>No Hotels Found</h3>)
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            <button className="btn btn-secondary btn-block mt-4" onClick={handleAuth} type='button'>Logout</button>
        </div>
    )
}

export default Dashboard
