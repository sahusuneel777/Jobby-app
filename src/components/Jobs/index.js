import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import Profile from '../Profile'
import AllJobsSection from '../AllJobsSection'
import FiltersGroup from '../FiltersGroup'
import './index.css'

class Jobs extends Component {
  filterSection = () => (
    <div className="filter-section">
      <Profile />
      <hr className="horizontal-line" />
      <FiltersGroup />
    </div>
  )

  jobsSection = () => (
    // const {searchInputValue, employmentType, minPackage} = this.state

    <div className="jobSection">
      <div className="search-container">
        <input
          type="search"
          className="search-field"
          // onClick={this.ChangeSearchInput()}
          placeholder="Search"
        />
        <button type="button" className="search-btn" testid="searchButton">
          <BsSearch className="search-icon" />
        </button>
      </div>
      <AllJobsSection />
    </div>
  )

  renderJobsRoute = () => (
    <div className="all-jobs-container">
      {this.filterSection()}
      {this.jobsSection()}
    </div>
  )

  render() {
    return (
      <>
        <Header />
        <div className="jobs-section-container">{this.renderJobsRoute()}</div>
      </>
    )
  }
}

export default Jobs
