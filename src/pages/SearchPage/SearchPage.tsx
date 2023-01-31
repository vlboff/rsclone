import React from 'react'
import './SearchPage.scss'
import CategoryCard from '../../components/CategoryCard/CategoryCard'

function SearchPage() {
  return (
    <div className='search'>
      <div className="search__arrows"></div>
      <div className="search__input">
        <input type="text" />
      </div>
      <div className="search__cards">
        <h3 className='search__cards-title'>Все оcтальное</h3>
        <CategoryCard/>
      </div>
    </div>
  )
}

export default SearchPage