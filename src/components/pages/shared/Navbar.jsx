import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router";



const Navbar = () => {
 
  const Selected_UserDAta = useSelector((state) => state.UserSate);
  const functionState = useSelector((state) => state.functionState);

  
  const NavItem = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/availablefoods"}>Available Foods</NavLink>
      </li>
      <li>
        <NavLink to={"/addFood"}>Add Food</NavLink>
      </li>
      <li>
        <NavLink to={"/mymanagefoods"}>Manage My Foods</NavLink>
      </li>
      <li>
        <NavLink to={"/myfoodrequest"}>My Food Request</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar  sticky top-0 left-0 z-50 backdrop-blur-md">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {NavItem}
          </ul>
        </div>
        <Link to={"/"} className="btn-sm btn btn-ghost text-xl">
          WebsiteName
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{NavItem}</ul>
      </div>
      <div className="navbar-end flex gap-1">
        {Selected_UserDAta.user ? (
          <>
            <div className="flex justify-center items-center gap-1">
              <button
                onClick={() => {
                  functionState.Funcs.onLoginOutClick("Log out successfully");
                }}
                className="btn btn-sm bg-red-500 text-white"
              >
                LogOut
              </button>
              <div className="group relative ">
                <NavLink
                  to={"/Profile"}
                  className={
                    "btn-sm group btn-circle btn overflow-hidden capitalize"
                  }
                >
                  <img src={Selected_UserDAta?.user?.photoURL} alt="img" />
                </NavLink>
                <div className="hidden group-hover:flex w-max p-2 absolute right-1 top-8 rounded z-50 shadow-lg flex-col">
                  {Selected_UserDAta.user?.displayName}{" "}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <NavLink to={"/login"} className={"btn-sm btn capitalize"}>
              Login
            </NavLink>
            <NavLink to={"/register"} className={"btn-sm btn capitalize"}>
              Register
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
