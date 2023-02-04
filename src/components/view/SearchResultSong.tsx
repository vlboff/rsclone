import React from 'react';
import { IconHeart, IconMoreInfo } from '../../icons';

function SearchResultSong(props: { image: string; name: string; author: string; duration: string | number }) {
  return (
    <div className='search-result-song'>
      <div className='search-result-song__image'>
        <img src={props.image} alt="/" />
      </div>
      <div className="track-info">
        <div className='track-name'>
          <a href="/">{props.name}</a>
        </div>
        <div className='track-author'>
          <a href="/">{props.author}</a>
        </div>
      </div>
      <button className='player-tool-button'>
        <IconHeart />
      </button>
      <div>{props.duration}</div>
      <button className='player-tool-button'>
        <IconMoreInfo />
      </button>
    </div >
  )
}

export default SearchResultSong;
