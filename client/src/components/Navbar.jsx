import { NavLink } from "react-router-dom";
import { useState } from "react";
import PropTypes from 'prop-types';

export default function Navbar({ onLogout }) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-logo-container">
        <img
          className="navbar-logo"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROfO2HIJPulqSu2ZgwV7hyGbpwzBRHJZkwfg&s"
          alt="HR Logo"
        />
        <h1 className="navbar-title">Employee Management System</h1>
      </NavLink>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <NavLink className="btn-base btn-outline" to="/">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
          Dashboard
        </NavLink>
        <NavLink className="btn-base btn-primary" to="/create">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          Add Employee
        </NavLink>
        
        {/* User Account Dropdown */}
        <div 
          className="user-dropdown-container"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <div className="user-avatar-circle">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzR0bIMZ71HVeR5zF4PihQaDvTQQk6bsVERw&s" 
              alt="User Logo" 
            />
          </div>
          {showDropdown && (
            <div className="dropdown-menu">
              <div className="dropdown-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                Profile
              </div>
              <div className="dropdown-divider"></div>
              <div className="dropdown-item logout" onClick={onLogout}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  onLogout: PropTypes.func.isRequired,
};
