import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Pay from "./components/Pay";
import Success from "./components/Success";
import { BrowserRouter as Router, Route, Routes,Navigate  } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

const App = () => {
  let user=useSelector((state)=>state.user.currentUser);
 // return <Cart/>
 return (
  <Router>
   
      <Routes>
       <Route exact path="/" element={user ? <Home/> :<Login/>}/>
       <Route  path="/products/:category" element={user ? <ProductList/>:<Login/>}/>
       <Route  path="/products" element={user ? <ProductList/> :<Login/>}/>
       <Route  path="/product/:id" element={user ? <Product/>:<Login/>}/>
       <Route  path="/cart" element={user ? <Cart/>:<Login/>}/>
       <Route path="/login" element={user ? <Navigate to="/" /> : <Login />}/>
       <Route path="/register" element={user ? <Navigate to="/" /> : <Register  />}/>
        <Route  path="/cart" element={user ? <Cart/>:<Login/>}/>
        <Route  path="/success" element={<Success/>}/>
        {/* <Route exact path="/" element={<Login/>}/>
        <Route exact path="/" element={<Home/>}/> */}
        {/* <Route  path="/products/:category" element={<ProductList/>}/> */}
        {/* <Route  path="/product/:id" element={<Product/>}/>
        <Route  path="/cart" element={<Cart/>}/>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />}/> */}
        {/* <Route  path="/login" element={<Login/>}/> */}
        {/* <Route  path="/register" element={<Register/>}/> */}
        {/* <Route path="/register" element={user ? <Navigate to="/" /> : <Register />}/> */}
        
      </Routes>
  </Router>
);
};

export default App;