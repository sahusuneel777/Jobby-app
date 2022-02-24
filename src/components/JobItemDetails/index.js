import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaSuitcase} from 'react-icons/fa'
import {ImLocation} from 'react-icons/im'
import {AiTwotoneStar} from 'react-icons/ai'
import {HiExternalLink} from 'react-icons/hi'
import './index.css'
import SkillItem from '../SkillItem'
import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobDetailsData: {},
    similarJobDetails: [],
    skills: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  formatSimilarJobs = similarJob => ({
    id: similarJob.id,
    similarJobImage: similarJob.company_logo_url,
    similarEmploymentType: similarJob.employment_type,
    similarJobDescription: similarJob.job_description,
    rating: similarJob.rating,
    location: similarJob.location,
    title: similarJob.title,
  })

  formatSkillList = eachSkill => ({
    name: eachSkill.name,
    skillImage: eachSkill.image_url,
  })

  formattedJobDetailsData = detailedData => ({
    companyLogoUrl: detailedData.job_details.company_logo_url,
    companyWebsiteUrl: detailedData.job_details.company_website_url,
    employmentType: detailedData.job_details.employment_type,
    id: detailedData.job_details.id,
    jobDescription: detailedData.job_details.job_description,
    location: detailedData.job_details.location,
    packagePerAnnum: detailedData.job_details.package_per_annum,
    rating: detailedData.job_details.rating,
    title: detailedData.job_details.title,
    lifeAtCompanyDescription:
      detailedData.job_details.life_at_company.description,
    lifeAtCompanyImageUrl: detailedData.job_details.life_at_company.image_url,
  })

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const options = {
      method: 'GET',
      headers: {
        Authorization: `BEARER ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    console.log(response)
    // let skillList = []
    if (response.ok === true) {
      const detailedData = await response.json()
      console.log(detailedData)
      const jobDetails = this.formattedJobDetailsData(detailedData)
      // console.log(jobDetails)
      const similarJobs = detailedData.similar_jobs.map(eachJob =>
        this.formatSimilarJobs(eachJob),
      )
      console.log(similarJobs)
      const skillList = detailedData.job_details.skills.map(eachSkill =>
        this.formatSkillList(eachSkill),
      )
      console.log(skillList)

      this.setState({
        jobDetailsData: jobDetails,
        skills: skillList,
        similarJobDetails: similarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobDetails = () => {
    const {jobDetailsData, skills, similarJobDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      lifeAtCompanyImageUrl,
      jobDescription,
      lifeAtCompanyDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetailsData
    return (
      <div className="job-item-details-section">
        <div className="job-details-card">
          <div className="company-details">
            <img
              src={companyLogoUrl}
              className="logo-img"
              alt="job details company logo"
            />
            <div className="job-info">
              <h1 className="job-title">{title}</h1>
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
          <div className="description-companyLink-container">
            <h1 className="description-heading">Description</h1>
            <a
              href={companyWebsiteUrl}
              target="_blank"
              rel="noreferrer"
              className="company-link"
            >
              <p>Visit</p>
              <HiExternalLink />
            </a>
          </div>
          <p className="description">{jobDescription}</p>
          <h1 className="second-heading">Skills</h1>
          <ul className="skills-list-container">
            {skills.map(eachSkill => (
              <SkillItem key={eachSkill.name} skillDetails={eachSkill} />
            ))}
          </ul>
          <h1 className="second-heading">Life at Company</h1>
          <div className="life-at-company-section">
            <p className="life-at-company-description">
              {lifeAtCompanyDescription}
            </p>
            <img
              className="life-at-company-pic"
              src={lifeAtCompanyImageUrl}
              alt="life at company"
            />
          </div>
        </div>
        <h1 className="second-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list-container">
          {similarJobDetails.map(eachSimilarJob => (
            <SimilarJobItem
              key={eachSimilarJob.id}
              similarJobDetails={eachSimilarJob}
            />
          ))}
        </ul>
      </div>
    )
  }

  refresh = () => {
    this.getJobDetails()
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" onClick={this.refresh} className="retry-btn">
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailsRoute = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderJobDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobDetailsRoute">{this.renderJobDetailsRoute()}</div>
      </>
    )
  }
}

export default JobItemDetails
