import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import JobItem from '../JobItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class AllJobsSection extends Component {
  state = {
    AllJobList: [],
    apiStatus: apiStatusConstants.initial,
    // employmentType: '',
    // minPackage: '',
    // searchInputValue: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  //   FilterEmploymentType = event => {
  //     this.setState({employmentType: event.target.value})
  //   }

  getJobs = async () => {
    const jobUrl = 'https://apis.ccbp.in/jobs'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const response = await fetch(jobUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()

      const updatedData = fetchedData.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
        id: eachJob.id,
      }))
      this.setState({
        AllJobList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else this.setState({apiStatus: apiStatusConstants.failure})
  }

  renderJobItems = () => {
    const {AllJobList} = this.state
    return (
      <ul className="jobs-list-container">
        {AllJobList.map(eachJob => (
          <JobItem key={eachJob.id} jobDetails={eachJob} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <>
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failure-image"
        />
        <h1 className="failure-heading">Oops!Something Went Wrong</h1>
        <p className="failure-description">
          We cannot seen to find the page you are looking for.
        </p>
        <button type="button" className="retry-btn">
          Retry
        </button>
      </>
    </div>
  )

  renderAllJobs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderJobItems()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="jobs-list-container-section">{this.renderAllJobs()}</div>
    )
  }
}

export default AllJobsSection
