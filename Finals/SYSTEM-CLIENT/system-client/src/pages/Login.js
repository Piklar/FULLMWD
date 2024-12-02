import { useState } from "react"
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";


export default function Login() {

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");


    function loginUser(e){
        e.preventDefault();

        fetch("http://localhost:4000/users/login", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(result => result.json())
        .then(result => {
            if(result.token){
                Swal.fire({
                    title: "LOGIN SUCCESS!",
                    text: "You can now use our enrollment system",
                    icon: "success"
                })
                localStorage.setItem("token", result.token);
            }else if(result.code === "USER-NOT-REGISTERED"){
                Swal.fire({
                    title: "YOU ARE NOT REGISTERED",
                    text: "Please register to login",
                    icon: "warning"
                }) 
            }else{
                Swal.fire({
                    title: "INCORRECT EMAIL/PASSWORD!",
                    text: "Please try again",
                    icon: "error"
                })
            }
        })
    }

    return(
        <Container fluid className="vh-100">
            <Row>
                <Col className="vh-100 bg-warning col-6 d-flex flex-column align-items-center justify-content-center">
                    <h1 className="display-5 fw-bold">CAN'T WAIT FOR YOU TO LOGIN!</h1>
                    <p className="display-6">Your Bright Future Begins Here!</p>
                </Col>

                <Col className="vh-100 col-6">
                     <Container fluid className="p-5 d-flex flex-column align-items-center justify-content-center">
                        <h1 className="dispay-3 fw-bold mb-5">LOGIN</h1>

                        <Form className="w-100 p-5 shadow rounded-3 border-bottom border-3 border-warning" onSubmit={e => loginUser(e)}>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control type="email" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control type="password" placeholder="Enter your password" required onChange={(e) => setPassword(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Button variant="warning" className="w-100 rounded-pill" type="submit">Login</Button>
                        </Form.Group>

                        </Form>   
                     </Container>   
                </Col>
            </Row>
        </Container>
    )
}
