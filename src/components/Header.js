import React from 'react'
import {Container,Nav,Navbar,NavDropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { logout ,getUserDetails} from "../actions/userActions";
import { useDispatch,useSelector } from 'react-redux'
// import axios from 'axios';
import SearchBox from "./SearchBox";
// import SearchBar from "./SearchBar";
const Header = () => {
  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo} = userLogin
  // const [userName, setUserName] = useState('');
  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;


  const dispatch = useDispatch()


  const logoutHandler = () => {
    dispatch(logout())
    window.location.href = '/login';
  }



  
  return (
    <div>
      <Navbar bg="dark" variant='dark'>
      <Container fluid>
        <LinkContainer to="/">
        <Navbar.Brand >DigiShop</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <LinkContainer to="/">
            <Nav.Link href="/"><i className='fas fa-home'></i>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/cart">
            <Nav.Link ><i className='fas fa-shopping-cart'></i>cart</Nav.Link>
            </LinkContainer>
            {userInfo?(
  <NavDropdown className='fa fa-dashboard' title={user.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                                </NavDropdown>

):

(


  <LinkContainer to="/login">
  <Nav.Link><i className="fas fa-user"></i> Login</Nav.Link>
  </LinkContainer>
)
}

              {userInfo ?(
                user.isAdmin &&
   (
    <NavDropdown title="Admin" id="adminmenu">
      <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
    </NavDropdown>
  )
) : (
   <LinkContainer to="/aboutus">
  <Nav.Link><i className="fas fa-address-card"></i> ContactUs</Nav.Link>
  </LinkContainer>
)}
          </Nav>
          
          </Navbar.Collapse>


      </Container>
    </Navbar>
   
    </div>
  );
}


export default Header
