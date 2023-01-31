import React from 'react'
import './CategoryCard.scss'

function CategoryCard() {
  return (
    <div className='category-card'>
        <span className='category-card__title'>Подкасты</span>
        <img src="./assets/img/preview.png" alt="" />
    </div>
  )
}

export default CategoryCard