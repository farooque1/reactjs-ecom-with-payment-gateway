import logo from './logo.svg';
import './App.css';
import Header from './Component/Header';
import Main from './Component/Main';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Cart from './Component/Cart';
import Like from './Component/Like';
import Login from './Component/Login';
import Paynow from './Component/Paynow';
import Checkout from './Component/Checkout';
import Confirm from './Component/Confirm';

function App() {
  return (
    <Router>
    <>
        <Header />
    
    <Routes>
      <Route exact path="/" element={<Main />}/>
      <Route exact path="/cart" element={<Cart />}/>
      <Route exact path="/favourite" element={<Like />}/>
      <Route exact path="/login" element={<Login />}/>
      <Route exact path="/paynow" element={<Paynow />}/>
      <Route exact path="/Checkout" element={<Checkout />}/>
      <Route exact path="/confirm" element={<Confirm />}/>
    </Routes>

{/* 
      <h1>My Shop App</h1>
      <p> functionality</p>
         <p> 1-like products</p>
          <p>2-add to cart </p>
          <p>3-view cart</p>
          <p>4-add and delte option in cart</p>
          <p>5-total calculation and discount</p>
          <p>6-payment getway</p>
          <p>7.insert all details in json db</p>
          <p>8-fetch all details and display product status</p>
          <p>9-(option) login and signup</p>
         <p>https://fakestoreapi.com/products</p>

         <div>
          <p>react feature</p>
          <p>1- Redux</p>
          <p>2- router</p>
          <p>3- saga or thunk</p>
          <p>4- axios</p>
          <p>5- function component</p>
          <p>6- clean code and comment the code</p>
          <p>7- github push</p>
          
         </div> */}
    </>
    </Router>
  );
}

export default App;
