import {Component} from 'react'
import {Link} from 'react-router-dom'
import {FaSuitcase} from 'react-icons/fa'
import {ImLocation} from 'react-icons/im'
import {AiTwotoneStar} from 'react-icons/ai'
import './index.css'

class JobItem extends Component {
  render() {
    const {jobDetails} = this.props
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      id,
    } = jobDetails
    return (
      <Link to={`/jobs/${id}`} className="job-item-link">
        <li className="job-item-card">
          <div className="company-details">
            <img src={companyLogoUrl} className="logo-img" alt="company logo" />
            <div className="job-info">
              <p className="job-title">{title}</p>
              <div className="rating-item">
                <AiTwotoneStar className="star" />
                <p className="rating-value">{rating}</p>
              </div>
            </div>
          </div>
          <div className="additional-details">
            <div className="location-jobtype-container">
              <div className="location">
                <ImLocation />
                <p className="job-description">{location}</p>
              </div>
              <div className="employment-type">
                <FaSuitcase />
                <p className="job-description">{employmentType}</p>
              </div>
            </div>
            <p className="salary">{packagePerAnnum}</p>
          </div>
          <hr className="horizontal-line" />
          <p className="description-heading">Description</p>
          <p className="description">{jobDescription}</p>
        </li>
      </Link>
    )
  }
}

export default JobItem
