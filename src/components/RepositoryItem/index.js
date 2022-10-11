// Write your code here
import {Component} from 'react'
import './index.css'

const RepositoryItem = props => {
  const {details} = props
  const {name, avatarUrl, starsCount, forksCount, issuesCount} = details
  return (
    <li className="RepositoryItem-container">
      <img src={avatarUrl} className="avatarUrl" alt={name} />
      <h1 className="name">{name}</h1>
      <div>
        <div className="stars-container">
          <img
            className="stars"
            alt="stars"
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          />
          <p>{starsCount}</p>
        </div>
        <div className="fork-container">
          <img
            className="fork"
            alt="forks"
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          />
          <p>{forksCount}</p>
        </div>
        <div className="issues-container">
          <img
            className="issues"
            alt="open issues"
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          />
          <p>{issuesCount}</p>
        </div>
      </div>
    </li>
  )
}
export default RepositoryItem
