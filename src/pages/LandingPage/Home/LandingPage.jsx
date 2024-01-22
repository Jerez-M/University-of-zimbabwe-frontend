import {Link} from 'react-router-dom'
import './index.css'
import LandingHeader from '../Header/LandingHeader'

const LandingPage = () => (
  <div className="home-container">
    <LandingHeader/>
    <div className="home-page">
      <div className="home-page-content">
        <h6 className="home-heading">Unlock Your Career Potential at University Of Zimbabwe</h6>
        <p className="home-description">
        Welcome to UZ Job Portal, your gateway to career success. Whether you're a 
        seasoned professional or just starting out, our platform empowers you to unlock your potential and find the perfect job opportunity
        </p>
        <Link to="/sign-up">
          <button className="find-jobs-button" type="button">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  </div>
)

export default LandingPage
