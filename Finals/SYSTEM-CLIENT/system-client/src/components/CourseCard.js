import { useState } from "react"
import { Card, Button, CardSubtitle } from "react-bootstrap"


export default function CourseCard() {
    let [count, setCount] = useState(0);

    // function sayHi(){
    //     console.log("Hi!");
    // }

    function enroll(){
        if(count !== 30){
            setCount(count + 1);
        }else{
            alert("No slots available.")
        }
        
    }

    return(
        <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Computer Networks</Card.Title>

        <CardSubtitle>Description</CardSubtitle>
        <Card.Text>
          Sumpang Subnetting
        </Card.Text>

        <CardSubtitle>Price</CardSubtitle>
        <Card.Text>
          10, 000
        </Card.Text>

        <CardSubtitle>Enrollees</CardSubtitle>
        <Card.Text>
          {count}
        </Card.Text>

        <Button variant="primary" onClick={enroll}>Enroll</Button>
      </Card.Body>
    </Card>
    )
};
