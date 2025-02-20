import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";
import logo from "../../assets/freshcart-logo.svg";
import "./Navbar.css";
import toast from "react-hot-toast";

function NavBar() {
  const navigate = useNavigate();

  const { userData, setUserData, userName } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const [isActive, setIsActive] = useState(false);
  const [icoActive, seticoActive] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 40 ? setIsActive(true) : setIsActive(false);
    });
  }, []);

  function Logout() {
    localStorage.removeItem("userData");
    setUserData(null);
    navigate("/login");
  }

  const handleLogout = () => {
    Logout();
    seticoActive(false);
    toast.success("Logged out successfully!", {
      duration: 2000,
      className: "text-emerald-500 px-4 text-bold",
    });
  };

  return (
    <nav
      className={`fixed w-full z-20 py-3 transition-all duration-500 ease-in-out 
    ${isActive ? "bg-white " : "bg-transparent"}fixed-top  py-3 ${
        icoActive ? "bg-white shadow-2xl" : "bg-transparent"
      }`}
    >
      <div className="w-[90%] mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link to="/" className="mr-4">
            <img src={logo} alt="Logo" className="h-10 w-full text-4xl" />
          </Link>
          <button
            className="md:hidden border-0 bg-transparent"
            onClick={() => seticoActive(!icoActive)}
          >
            <i className="fa-solid fa-bars text-2xl text-gray-800"></i>
          </button>
        </div>

        <ul
          className={`flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4
        ${icoActive ? "flex" : "hidden"} md:flex w-full mt-4 md:mt-0`}
        >
          {userData && (
            <>
              <li className="hover:text-gray-500">
                <NavLink to="/" onClick={() => seticoActive(false)}>
                  Home
                </NavLink>
              </li>
              <li className="hover:text-gray-500">
                <NavLink to="/products" onClick={() => seticoActive(false)}>
                  Products
                </NavLink>
              </li>
              <li className="hover:text-gray-500">
                <NavLink to="/categories" onClick={() => seticoActive(false)}>
                  Categories
                </NavLink>
              </li>
              <li className="hover:text-gray-500">
                <NavLink to="/brands" onClick={() => seticoActive(false)}>
                  Brands
                </NavLink>
              </li>
              <li className="hover:text-gray-500">
                <NavLink to="/allorders" onClick={() => seticoActive(false)}>
                  All Orders
                </NavLink>
              </li>
            </>
          )}
        </ul>

        <div
          className={`flex flex-row items-center space-x-4 ${
            icoActive ? "flex" : "hidden"
          } md:flex`}
        >
          {userData !== null ? (
            <>
              <NavLink
                className="relative"
                to="/cart"
                onClick={() => seticoActive(false)}
              >
                <i className="fa-solid fa-cart-arrow-down text-emerald-700 text-2xl"></i>
                <div className="numCustomize bg-red-500 text-white rounded-3xl text-center">
                  {cart ? cart.numOfCartItems : 0}
                </div>
              </NavLink>

              <NavLink
                className="relative"
                to="/wishlist"
                onClick={() => seticoActive(false)}
              >
                <i className="fa-regular fa-heart text-danger text-2xl"></i>
                <div className="numCustomize bg-red-500 text-white rounded-3xl text-center">
                  <span>{wishlist ? wishlist?.data?.length : 0}</span>
                </div>
              </NavLink>

              <NavLink
                to="/Profile"
                className="flex items-center space-x-2"
                onClick={() => seticoActive(false)}
              >
                <i className="fa-regular fa-circle-user text-xl"></i>
                <span>{userName}</span>
              </NavLink>

              <button
                onClick={handleLogout}
                className="text-red-700 border border-red-700 px-4 py-2 rounded-lg hover:bg-red-700 hover:text-white whitespace-nowrap"
              >
                Log Out <i className="fa-solid fa-right-from-bracket ml-2"></i>
              </button>
            </>
          ) : (
            <>
              <NavLink
                className="font-semibold"
                to="/login"
                onClick={() => seticoActive(false)}
              >
                Login
              </NavLink>
              <NavLink
                className="font-semibold"
                to="/register"
                onClick={() => seticoActive(false)}
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
