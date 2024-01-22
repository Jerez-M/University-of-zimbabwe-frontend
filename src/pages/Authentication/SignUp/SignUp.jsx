import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="row mt-5">
        <div className="col-12 text-center">
          <h1>Sign Up</h1>
          <div className="d-flex justify-content-between mt-5">
            <button className="btn btn-lg btn-primary px-4 me-5" onClick={() => navigate('/sign-in')}>
              Sign In
            </button>
            <button className="btn btn-secondary px-4 ms-5" onClick={() => navigate('/')}>
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;