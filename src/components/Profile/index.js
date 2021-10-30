import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Profile extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    profileData: {},
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {profileData} = this.state
    if (profileData !== nextState.profileData) {
      return true
    }
    return false
  }

  retry = () => this.getProfileDetails()

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const profileUrl = 'https://apis.ccbp.in/profile'

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const response = await fetch(profileUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()

      const updateFetchedData = {
        name: fetchedData.profile_details.name,
        profileImageUrl: fetchedData.profile_details.profile_image_url,
        shortBio: fetchedData.profile_details.short_bio,
      }
      this.setState({
        profileData: updateFetchedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  //   shouldshouldComponentUpdate(nextProps, nextState) {
  //     const {profileData} = this.state
  //     if (profileData !== nextState.profileData) {
  //       return true
  //     }
  //     return false
  //   }

  renderProfileSection = () => {
    const {profileData} = this.state
    console.log(profileData)
    const {name, profileImageUrl, shortBio} = profileData
    return (
      <div className="profile-container">
        <img src={profileImageUrl} className="avatar" alt="profile-avatar" />
        <h1 className="name">{name}</h1>
        <p className="bio">{shortBio}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="profile-failure-view">
      <button type="button" onClick={this.retry} className="retry-btn">
        Retry
      </button>
    </div>
  )

  retry = () => {
    this.getProfileDetails()
  }

  renderProfileLoader = () => (
    <div className="profile-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfile = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderProfileSection()
      case apiStatusConstants.inProgress:
        return this.renderProfileLoader()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderProfile()}</div>
  }
}

export default Profile
