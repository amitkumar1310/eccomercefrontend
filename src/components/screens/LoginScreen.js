// import React,{useState,useEffect} from "react";
// import { Link } from "react-router-dom";
// import { Row, Col, Image, ListGroup, Button, Card,Form } from "react-bootstrap";
// import Loader from '../Loader';
// import Message from '../Message';
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "../../actions/userActions";
// import FormContainer from '../FormContainer'


// function LoginScreen({location,history}) {

//     const [email,setEmail]=useState('')
//     const [password,setPassword]=useState('')
//     const dispatch = useDispatch()

//     const redirect = location.search ? location.search.split('=')[1] :'/'
 
//     const userLogin = useSelector(state=>state.userLogin)
//     const {error,loading,userInfo}=userLogin

//     useEffect(()=>{
//         if(userInfo){
//             history.push(redirect)
//         }
//     },[history,userInfo,redirect])


//     const submitHandler= (e)=>{
//         e.preventDefault()
//         dispatch(login(email,password))
//     }
//     return (
//         <div>
//          <FormContainer>
//           <h1>Sign In</h1>
//           {error && <Message variant='danger'>{error}</Message>}
//           {loading && <Loader />}

//           <Form onSubmit={submitHandler}>


//               <Form.Group controlId='email'>
//                 <Form.Label>Email Address </Form.Label>
//                 <Form.Control required type='email' placeholder='Enter Email' value={email} onChange={(e)=> setEmail(e.target.value)}></Form.Control>
//               </Form.Group>

//               <Form.Group controlId='password'>
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control required type='password' placeholder='Enter Password' value={password} onChange={(e)=> setPassword(e.target.value)}></Form.Control>
//               </Form.Group>

//             <Button className='mt-3' type='submit' variant='primary'>Sign In</Button>

//           </Form>

//           <Row className='py-3'>
//               <Col>
//               New Customer? 
//               <Link to={redirect?`/register?redirect=${redirect}`:'/register'}>Register</Link>
//               </Col>

//           </Row>

//          </FormContainer>
//         </div>
//     )
// }

// export default LoginScreen
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card, Form } from "react-bootstrap";
import Loader from '../Loader';
import Message from '../Message';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
import FormContainer from '../FormContainer';
// import { GoogleLogin } from 'react-google-login';
import backgroundImage from '../../videos/img3.png';
function LoginScreen() {
  const { redirect } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  // const responseGoogle = async(response) => {
  //   let googleResponse=await axios
  //   // Handle the Google authentication response
  //   // You can access the user's profile information from the 'response' object
  //   console.log(response);
  // };
  return (
    <div>
      {/* <Card style={{backgroundImage:`url(${backgroundImage})`,backgroundColor:'yellow'}}> */}
      <Card style={{backgroundColor:'wheat'}}>
      <FormContainer>
        <h1>Sign In</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              required
              type='email'
              placeholder='Enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type='password'
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button className='mt-3' type='submit' variant='primary' style={{color:"wheat"}}>
            Sign In
          </Button>
        </Form>

        <Row className='py-3'>
          <Col style={{color:'black'}}>
            New Customer?{' '}
            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
              Register
            </Link>
          </Col>
        </Row>
      </FormContainer>
      {/* <GoogleLogin
        clientId="437541052320-efcfvbkpc9g3uikse4d04o3cvvl82128.apps.googleusercontent.com"
        buttonText="Sign in with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      /> */}
      </Card>
    </div>
  );
}

export default LoginScreen;
