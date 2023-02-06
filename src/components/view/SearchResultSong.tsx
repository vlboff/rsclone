import React from 'react';
import { IconButtonPause, IconButtonPlay, IconHeart, IconMoreInfo } from '../../icons';
import { isPlaying, playPauseTrack } from '../../utils/playback';

function SearchResultSong(props: { image: string; name: string; author: string; duration: string | number; id: string }) {
  return (
    <div className='search-result-song' id={props.id}>
      <div className='search-result-song__image'>
        <img src={props.image} alt="/" />
        <button className='player-tool-button play-pause-song'
          onClick={() => { playPauseTrack(props.id) }
          }>
          <IconButtonPlay />
        </button>
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
