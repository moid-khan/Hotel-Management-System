// import React from 'react'
// import { Button, Card } from 'react-bootstrap'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const HotelCard = ({ title, rooms, price, imgSrc }) => {



    const allData = () => {
        console.log(title);
        console.log(rooms);
        console.log(price);
        console.log(imgSrc);
    }

    return (
        <Card>
            <CardMedia
                component="img"
                height="200"
                image={imgSrc}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                   {title}
                </Typography>
                <hr />
                <div style={{display: "flex", justifyContent: "space-between"}}>
                <Typography variant="h6">
                    <small style={{color: '#666'}}>No. of Rooms </small>
                   {rooms}
                </Typography>
                <Typography variant="h6">
                    <small style={{color: '#666'}}>Price: </small>
                   {price}/Day
                </Typography>
                </div>
            </CardContent>
            <CardActions>
                {/* <Button size="small">Share</Button> */}
                <Button onClick={()=>{allData()}} variant="contained">Book Now</Button>
            </CardActions>
        </Card>
    )
}

export default HotelCard
