import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Profile from '../Profile'
import JobItem from '../JobItem'
import FiltersGroup from '../FiltersGroup'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    AllJobList: [],
    apiStatus: apiStatusConstants.initial,
    employmentTypeList: [],
    minPackage: '',
    searchInputValue: '',
  }

  componentDidMount() {
    this.getFilterAndJobs()
  }

  //   filterSection = () => (
  //     <div className="filter-section">
  //       <Profile />
  //       <hr className="horizontal-line" />

  //     </div>
  //   )

  //   jobsSection = () => (
  //     <div className="jobSection">
  //       <div className="search-container">
  //         <input
  //           type="search"
  //           className="search-field"
  //           // onClick={this.ChangeSearchInput()}
  //           placeholder="Search"
  //         />
  //         <button type="button" className="search-btn" testid="searchButton">
  //           <BsSearch className="search-icon" />
  //         </button>
  //       </div>
  //       <AllJobsSection />
  //     </div>
  //   )

  getFilterAndJobs = async () => {
    const {employmentTypeList, minPackage, searchInputValue} = this.state
    const employmentType = employmentTypeList.join(',')
    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minPackage}&search=${searchInputValue}`
    console.log(jobsApiUrl)
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `BEARER ${jwtToken}`,
      },
      method: 'GET',
    }
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jobResponse = await fetch(jobsApiUrl, options)
    if (jobResponse.ok === true) {
      const fetchedJobData = await jobResponse.json()

      const updatedJobData = fetchedJobData.jobs.map(eachJob => ({
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
        AllJobList: updatedJobData,
        apiStatus: apiStatusConstants.success,
      })
    } else this.setState({apiStatus: apiStatusConstants.failure})
  }

  renderNoView = () => (
    <div className="no-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-img"
      />
      <h1 className="no-view-heading">No jobs Found</h1>
      <p className="no-view-description">
        We could not find any jobs. Try other filters
      </p>
      <button type="button" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  renderJobItems = () => {
    const {AllJobList, searchInputValue} = this.state
    // const filterJobList = AllJobList.filter(eachJob =>
    //   eachJob.title.toLowerCase().includes(searchInputValue),
    // )
    const shouldShowProductsList = AllJobList.length < 1

    return shouldShowProductsList ? (
      this.renderNoView()
    ) : (
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
        <h1 className="failure-heading">Oops! Something Went Wrong</h1>
        <p className="failure-description">
          We cannot seem to find the page you are looking for
        </p>
        <button type="button" onClick={this.retry} className="retry-btn">
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

  changeEmploymentType = employmentId => {
    const {employmentTypeList} = this.state
    if (employmentTypeList.includes(employmentId) === false) {
      this.setState(
        prevState => ({
          employmentTypeList: [...prevState.employmentTypeList, employmentId],
        }),
        this.getFilterAndJobs,
      )
    }
  }

  FilterEmployeSalary = salaryId => {
    this.setState({minPackage: salaryId}, this.getFilterAndJobs)
  }

  ChangeSearchInput = event => {
    this.setState({searchInputValue: event.target.value})
  }

  retry = () => this.getFilterAndJobs()

  //   onEnterSearchInput = event => {
  //     // if (event.key === 'Enter') {
  //     this.setState({searchInputValue: event.target.value}, this.getFilterAndJobs)
  //     // }
  //   }

  searchJobs = () => {
    // this.setState({searchInputValue: event.target.value})
    // this.ChangeSearchInput()
    this.getFilterAndJobs()
  }

  render() {
    return (
      <>
        <div className="jobs-section-route">
          <Header />

          <div className="jobs-filter-section">
            <div className="filter-profile-section">
              <Profile />
              <hr className="horizontal-line" />
              <FiltersGroup
                changeEmploymentType={this.changeEmploymentType}
                FilterEmployeSalary={this.FilterEmployeSalary}
              />
            </div>
            <div className="jobSection">
              <div className="search-container">
                <input
                  type="search"
                  className="search-field"
                  onChange={this.ChangeSearchInput}
                  onKeyDown={this.onEnterSearchInput}
                  placeholder="Search"
                />
                <button
                  type="button"
                  className="search-btn"
                  testid="searchButton"
                  onClick={this.searchJobs}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
              {this.renderAllJobs()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
