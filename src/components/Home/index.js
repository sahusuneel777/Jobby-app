import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    const token = Cookies.get('jwt_token')
    if (token === undefined) {
      return <Redirect to="/Login" />
    }
    return (
      <>
        <Header />
        <div className="home-container">
          <div className="banner-section">
            <h1 className="heading">Find The Job Thats Fit Your Life</h1>
            <p className="description">
              Millions of people are searching for jobs,salary
              information,company reviews.Find the job that fits your abilities
              and potential.
            </p>
            <Link to="/jobs">
              <button type="button" className="find-jobs-btn">
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </>
    )
  }
}

export default Home
