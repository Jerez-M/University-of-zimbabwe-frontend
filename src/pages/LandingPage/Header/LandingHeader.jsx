import {useNavigate, Link} from 'react-router-dom'
import logo from '../../../assets/images/uz-logoo.png'
import './index.css'

const LandingHeader = props => {
  const navigate = useNavigate()

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/">
          <img
            src={logo}
            alt="website logo"
            className="home-website-logo"
          />
        </Link>
        <ul className="nav-items">
          <li>
            <Link to="/" className="nav-link-lg">
              Home
            </Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link-lg">
              Contact Us
            </Link>
          </li>
        </ul>
        <button
          type="button"
          className="logout-button-lg"
          onClick= {()=>navigate('/sign-in')}
        >
          Login
        </button>
      </div>
    </nav>
  )
}

export default LandingHeader
