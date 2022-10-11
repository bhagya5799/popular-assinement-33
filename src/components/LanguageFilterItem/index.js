import React from 'react'
import './index.css'

const LanguageFilterItem = props => {
  const {languageList, onClickChange, activeId, id} = props
  const {language} = languageList
  const onCLickUpadate = () => {
    onClickChange(id)
  }
  const style = activeId ? 'btnCss' : 'btnNonCss'
  return (
    <li className="languageItems">
      <button className={style} onClick={onCLickUpadate} type="button">
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
