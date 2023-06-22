
import {Container} from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import  AboutUs from './components/AboutUs';
import Electronics from './components/productsearch/Electronics';
import PriceRange from './components/productsearch/PriceRange';
import Sports from './components/productsearch/Sports';
import Menswear from './components/productsearch/Menswear';
import Womenswear from './components/productsearch/Womenswear';

import HomeScreen from './components/screens/HomeScreen';
import ProductScreen from './components/screens/ProductScreen';
import CartScreen from "./components/screens/cartScreen";
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import ShippingScreen from "./components/screens/ShippingScreen";
import PaymentScreen from "./components/screens/PaymentScreen";
import PlaceOrderScreen from "./components/screens/PlaceOrderScreen";
import OrderScreen from "./components/screens/OrderScreen";
import UserListScreen from "./components/screens/UserListScreen";
import UserEditScreen from "./components/screens/UserEditScreen";
import ProductListScreen from "./components/screens/ProductListScreen";
import ProductEditScreen from "./components/screens/ProductEditScreen";
import OrderListScreen from "./components/screens/OrderListScreen";
// import "./components/common.css";
import backgroundImage from './videos/img3.png';
function App() {
  return (
    <Router>
      <Header />
      <div  style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: 0,zIndex:-5
        }}>
      
      <div className='main-content'>
      <main >
        {/* <div>Welcome Shopping</div> */}
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart/:id?" element={<CartScreen />} />
            <Route path="/shipping" element={<ShippingScreen/>} />
            <Route path="/aboutus" element={<AboutUs/>} />
            <Route path="/electronics" element={<Electronics/>} />
            <Route path="/range" element={<PriceRange/>} />
            <Route path="/sports" element={<Sports/>} />
            <Route path="/menswear" element={<Menswear/>} />
            <Route path="/womenswear" element={<Womenswear/>} />
<Route path="/payment" element={<PaymentScreen/>} />

<Route path="/placeorder" element={<PlaceOrderScreen/>} />

<Route path="/order/:id" element={<OrderScreen/>} />


<Route path="/admin/userlist" element={<UserListScreen/>} />

<Route path="/admin/user/:id/edit" element={<UserEditScreen/>} />

<Route path="/admin/product/:id/edit" element={<ProductEditScreen/>} />

<Route path="/admin/productlist" element={<ProductListScreen/>} />

<Route path="/admin/orderlist" element={<OrderListScreen/>} />

          </Routes>
        </Container>
      </main>
      <Footer />
      </div>
      </div>
    </Router>
  );
}

export default App;
