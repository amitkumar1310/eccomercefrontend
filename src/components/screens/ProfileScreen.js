// import bgimage1 from '../../videos/background1.mp4';
// import './homescreen.css';
import React, { useEffect,useState } from "react";
import { Row, Col,Form,Button,Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails , updateUserProfile} from "../../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import { listMyOrders } from "../../actions/orderActions";

import Message from "../Message";
import Loader from "../Loader";

function ProfileScreen() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);

  const { success } = userUpdateProfile;
  const orderListMy = useSelector((state) => state.orderListMy);

  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    console.log("userInfo123:", userInfo);
    console.log("user123:", user);
    console.log("userDetails123:", userDetails);
    
    console.log("user123:", user);
    console.log("success123:", success);
    console.log("userInfo._id123:", user._id);

    if (!userInfo) {
      console.log("User info not found. Redirecting to login...");
      navigate("/login");
    }else {

      // WE DON'T HAVE THE USER INFO SO WE DISPATCH AN ACTION TO GET THE DATA
      if (!user || !user.name|| !success|| userInfo._id !== user._id) {
        /* (userInfo._id !== user._id) BECAUSE DURING USER EDIT STATE CHANGES SO WE WANT TO FIRE DISPATCH AGAIN HERE IF THE DATA ISN'T SAME AS THE USER AS WE ARE LOGGED IN  */
        // RESETTING PROFILE BEFORE FETCHING DATA SO THAT WE ALWAYS HAVE UPDATED DATA
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        console.log("Dispatching getUserDetails()");
        dispatch(getUserDetails());
        
        // FETCHING USER DATA
        
        dispatch(listMyOrders());
        
      } else {
        // WE HAVE THE USER INFO SO WE SET OUR STATE
        console.log("Setting user state");
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, userInfo, user,success]);
  console.log("User:", user);
  const submitHandler = (e) => {
    e.preventDefault();

    /* DISABLE SUBMIT IF PASSWORDS DON'T MATCH */
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name: name,
          email: email,
          password: password,
        })
      );
      navigate("/login");
      setMessage("relogin to get into effect");
    }
  };



return (
  <div style={{backgroundColor:"wheat",margin:0,padding:20,opacity:0.95,zIndex:-1}}>
    {/* <div className='video-background'>
          <video autoPlay loop muted>
            <source src={bgimage1} type='video/mp4' />
          </video>
        </div> */}
  <Row>
    <Col md={3}>
    <div><strong>Profile username: {user && user.username}</strong></div>
    <div> <strong>name: {user && user.name}</strong></div>
    {/* console.log("userInfo:", userInfo);
<h2>User Profile: ${userInfo.username }</h2>

    <h2>User Profile: {userInfo.username}</h2>
      console.log(userInfo.name); */}
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
  {/* onSubmit={submitHandler */}
      <Form  onSubmit={submitHandler}>   
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="passwordConfirm">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          Update
        </Button>
      </Form>
    </Col>
    <Col md={9}>
        <h2>My Orders</h2>

        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>
                    {order.createdAt ? order.createdAt.substring(0, 10) : null}
                  </td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt ? (
                        order.paidAt.substring(0, 10)
                      ) : null
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}/`}>
                      <Button className="btn-sm">Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    
  </Row>
  </div>
);
}

export default ProfileScreen;





