import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import './index.css'

class Header extends Component {
  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <div className="header-container">
        <Link to="/" className="nav-item-link">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="nav-logo"
            alt="website logo"
          />
        </Link>
        <ul className="nav-card">
          <Link to="/" className="nav-item-link">
            <li className="nav-item">Home</li>
          </Link>
          <Link to="/jobs" className="nav-item-link">
            <li className="nav-item">Jobs</li>
          </Link>
        </ul>
        <button
          type="button"
          onClick={this.onClickLogout}
          className="logout-btn"
        >
          Logout
        </button>
      </div>
    )
  }
}

export default withRouter(Header)
