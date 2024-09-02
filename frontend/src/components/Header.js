import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
    <nav>
      <Link to="/" className="nav-items">Home</Link>
      <Link to="/donate" className="nav-items">Donation</Link>
      <Link to="/events" className="nav-items">Events</Link>
      <Link to= "/blogs" className='nav-items'>Blogs </Link>
      
      
      </nav>
      </>
  );
};

export default Header;
