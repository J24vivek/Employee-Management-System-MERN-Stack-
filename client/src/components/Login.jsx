import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin();
      navigate('/');
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg">
        <img 
          src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2000" 
          alt="Modern Office" 
        />
        <div className="login-overlay">
          <div className="login-quote">
            <h1>Employee Management System.</h1>
            <p>A sophisticated workspace designed for modern HR workflows. Track, manage, and grow your organization with ease.</p>
          </div>
        </div>
      </div>
      
      <div className="login-form-container">
        <div className="login-card">
          <div className="login-header">
            
            <h2>Sign in to E.M.S</h2>
            <p>Enter your credentials to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                placeholder="name@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <button type="submit" className="login-btn">
              Sign In
            </button>
          </form>

          
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
