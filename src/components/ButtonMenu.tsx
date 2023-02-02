import React from 'react'
import { ArrowDownIcon } from '../icons';

function ButtonMenu() {
  return (
    <button className='button-menu btn-reset'>
        <div className="button-menu__avatar">
            <img src="" alt="" />
        </div>
        <span className="button-menu__name">John Johnson</span>
        <ArrowDownIcon className='button-menu__icon'/>
    </button>
  )
}

export default ButtonMenu