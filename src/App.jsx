import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import Wishlist from "./Components/Wishlist/Wishlist";
import CheckOut from "./Components/CheckOut/CheckOut";
import Notfound from "./Components/NotFound/Notfound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserContextProvider from "./Context/UserContext";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";
import { Toaster } from "react-hot-toast";
import CartContextProvider from "./Context/CartContext";
import WishlistContextProvider from "./Context/WishlistContext";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import ResetCode from "./Components/ResetCode/ResetCode";
import NewPassword from "./Components/NewPassword/NewPassword";
import CategoryProduct from "./Components/CategoryProduct/CategoryProduct";
import BrandProduct from "./Components/BrandProduct/BrandProduct";
import AllOrders from "./Components/AllOrders/AllOrders";
import Profile from './Components/Profile/Profile';

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index:true , element:<ProtectedRoutes><Home /></ProtectedRoutes> },
        { path: "/products", element: <ProtectedRoutes><Products /></ProtectedRoutes> },
        { path: "/productDetails/:id/:categoryname", element: <ProtectedRoutes><ProductDetails /></ProtectedRoutes> },
        { path: "/categories", element: <ProtectedRoutes><Categories /></ProtectedRoutes> },
        { path: "/categoryProducts/:categoryname", element: <ProtectedRoutes><CategoryProduct /></ProtectedRoutes> },
        { path: "/brandsProducts/:brandname", element: <ProtectedRoutes><BrandProduct /></ProtectedRoutes> },
        { path: "/brands", element:<ProtectedRoutes><Brands /></ProtectedRoutes> },
        { path: "/cart", element: <ProtectedRoutes><Cart /></ProtectedRoutes> },
        { path: "/wishlist", element: <ProtectedRoutes><Wishlist /></ProtectedRoutes> },
        { path: "/checkout", element: <ProtectedRoutes><CheckOut /></ProtectedRoutes> },
        { path: "/allorders", element: <ProtectedRoutes><AllOrders /></ProtectedRoutes> },
        { path: "/login", element: <Login /> },
        { path: "/profile", element: <Profile /> },
        { path: "/register", element: <Register /> },
        { path: "/forgetpassword", element: < ForgetPassword /> },
        { path: "/resetcode", element: <ResetCode /> },
        { path: "/newpassword", element: <NewPassword /> },
        

        { path: "*", element: <Notfound /> },
      ],
    },
  ]);

  const query=new QueryClient();
  
  return(
    
  <QueryClientProvider client={query}>
    <UserContextProvider>
      <CartContextProvider>
        <WishlistContextProvider>
          <RouterProvider router={router} />
        </WishlistContextProvider>
      </CartContextProvider>
    </UserContextProvider>
    <Toaster
      position="top-center"
      reverseOrder={false}
      />
  </QueryClientProvider>
  
  );
}

export default App;