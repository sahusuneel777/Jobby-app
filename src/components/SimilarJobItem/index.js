import {AiTwotoneStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {FaSuitcase} from 'react-icons/fa'
import './index.css'

const SimilarJobItem = props => {
  const {similarJobDetails} = props
  const {
    similarJobImage,
    similarEmploymentType,
    similarJobDescription,
    rating,
    location,
    title,
  } = similarJobDetails
  return (
    <div className="similar-job-item">
      <div className="company">
        <img
          src={similarJobImage}
          className="logo-img"
          alt="similar job company logo"
        />
        <div className="job-role">
          <h1 className="employment-type">{title}</h1>
          <div className="rating-item">
            <AiTwotoneStar className="star" />
            <p className="rating-value">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="description-heading">Description</h1>
      <p className="similar-job-description">{similarJobDescription}</p>
      <div className="location-jobtype-container">
        <div className="location">
          <ImLocation />
          <p className="job-description">{location}</p>
        </div>
        <div className="employment-type">
          <FaSuitcase />
          <p className="job-description">{similarEmploymentType}</p>
        </div>
      </div>
    </div>
  )
}

export default SimilarJobItem
