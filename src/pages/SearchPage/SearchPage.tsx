import React from 'react'
import CategoryCard from '../../components/CategoryCard'
import SearchBar from '../../components/SearchBar'

function SearchPage() {
  return (
    <div className='search'>
      {/* <div className="search__arrows"></div>
      <SearchBar/> */}
      <h3 className='search__cards-title'>Все оcтальное</h3>
      <div className="search__cards">
        <CategoryCard/>
        <CategoryCard/>
        <CategoryCard/>
        <CategoryCard/>
        <CategoryCard/>
        <CategoryCard/>
        <CategoryCard/>
        <CategoryCard/>
        <CategoryCard/>
        <CategoryCard/>
        <CategoryCard/>
        <CategoryCard/>
        <CategoryCard/>
        <CategoryCard/>
      </div>
    </div>
  )
}

export default SearchPage