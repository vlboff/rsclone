import React from 'react'
import { SearchIcon } from '../icons'

function SearchBar() {
  return (
    <form className='search__form'>
       <label className='search__label'>
          <SearchIcon className='search__svg'/>
          <input className='search__input' type="text" placeholder='Что хочешь послушать?'/>
       </label>
    </form>
  )
}

export default SearchBar