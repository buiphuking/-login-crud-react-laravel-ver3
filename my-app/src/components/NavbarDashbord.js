import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../slices/userSlice";
export const NavbarDashbord = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div>
      <div className='pb-5'>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
          <div className='container'>
            <Link className='navbar-brand' to='/'>
              Admin
            </Link>
            <button
              className='navbar-toggler'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#navbarSupportedContent'
              aria-controls='navbarSupportedContent'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <span className='navbar-toggler-icon'></span>
            </button>
            <div
              className='collapse navbar-collapse'
              id='navbarSupportedContent'
            >
              <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
                <li className='nav-item'>
                  <Link className='nav-link' to='/'>
                    Home
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/' className='nav-link' onClick={handleLogout}>
                    Log out
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Outlet />
      </div>
    </div>
  );
};
