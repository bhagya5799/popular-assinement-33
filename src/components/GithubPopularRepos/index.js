import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const constStatusApi = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    itemsList: [],
    apiStatus: constStatusApi.initial,
    activeId: languageFiltersData[0].id,
  }

  componentDidMount = () => {
    this.getItemsList()
  }

  getItemsList = async () => {
    const {activeId} = this.state
    this.setState({apiStatus: constStatusApi.progress})
    const url = `https://apis.ccbp.in/popular-repos?language=${activeId}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url)
    const data = await response.json()
    console.log(data.popular_repos)
    if (response.ok === true) {
      const updateData = data.popular_repos.map(eachEvent => ({
        id: eachEvent.id,
        avatarUrl: eachEvent.avatar_url,
        name: eachEvent.name,
        issuesCount: eachEvent.issues_count,
        forksCount: eachEvent.forks_count,
        starsCount: eachEvent.stars_count,
      }))
      this.setState({
        itemsList: updateData,
        apiStatus: constStatusApi.success,
      })
      console.log(updateData)
    } else {
      this.setState({apiStatus: constStatusApi.failure})
    }
  }

  onClickChange = id => {
    this.setState({activeId: id}, this.getItemsList)
  }

  renderFailureView = () => (
    <div className="failureView">
      <img
        className="falure-img"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderScussview = () => {
    const {itemsList, activeId} = this.state
    return (
      <ul className="RepositoryItem-box">
        {itemsList.map(eachItem => (
          <RepositoryItem
            details={eachItem}
            onClickChange={this.onClickChange}
            activeId={activeId === eachItem.id}
            key={eachItem.id}
          />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div>
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepositary = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case constStatusApi.success:
        return this.renderScussview()
      case constStatusApi.failure:
        return this.renderFailureView()
      case constStatusApi.progress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {itemsList, activeId} = this.state
    return (
      <div className="github-popular-container">
        <h1 className="popular">Popular</h1>
        <ul>
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              languageList={eachItem}
              activeId={activeId === eachItem.id}
              key={eachItem.id}
            />
          ))}
        </ul>
        {this.renderRepositary()}
      </div>
    )
  }
}
export default GithubPopularRepos
