import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Products from './Components/Products/Products';
import Cart from './Components/Cart/Cart';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import NotFound from './Components/Notfound/Notfound';
import CounterContextProvider from './Context/CounterContext';
import Navbar from './Components/Navbar/Navbar';
import Profile from './Components/Profile/Profile';
import UserContextProvider, { UserContext } from './Context/UserContext';
import { useContext, useEffect } from 'react';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContext';
import Address from './Components/address/address';
import Orders from './Components/Orders/Orders';







let routers = createBrowserRouter([
  {path: '/' , element:<Layout/> , children: [
    { index:true , element: <ProtectedRoute><Home /></ProtectedRoute>  },
    { path: 'login', element: <Login /> },
    { path: 'register', element: <Register /> },
    { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute>  },
    { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute>  },
    { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute>  },
    { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
    { path: 'profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },
    { path: 'address', element: <ProtectedRoute><Address /></ProtectedRoute> },
    { path: 'allorders', element: <ProtectedRoute><Orders /></ProtectedRoute> },
    { path: 'productdetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute>  },
    { path: '*', element: <NotFound /> },
    
  ]}
])

function App() {

  let { setUserToken } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem('userToken') !== null)
    {
      setUserToken(localStorage.getItem('userToken'))  
    }
  }, []);

  

  return <CartContextProvider>
            <CounterContextProvider>
              <RouterProvider router={routers}></RouterProvider>
    </CounterContextProvider>
    <Toaster/>
          </CartContextProvider>
  
  
  
  
}

export default App;
