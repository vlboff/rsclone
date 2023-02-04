import React from 'react';

function SearchResultArtist(props: { artistName: string; artistImage: string }) {
  return (
    <div className='search-result-artist'>
      <a href="#">
        <div>
          <img src={props.artistImage} alt="" className='search-result-artist__image' />
          <p className='search-result-artist__title'>{props.artistName}</p>
        </div>
      </a>
    </div>
  )
}

export default SearchResultArtist;
