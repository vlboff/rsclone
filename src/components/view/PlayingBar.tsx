import React from 'react';
import { IconButtonBack, IconButtonNext, IconButtonPlay, IconHeart, IconHide, IconMicrophone, IconQueue, IconRepeat, IconShow, IconShuffle, IconVolumeOn } from '../../icons';
import { handlePlayingBarControls, handleVolumeClick } from '../../utils/playback';

function PlayingBar() {

  function expandCoverArt() {
    (document.querySelector('.playing-widget') as HTMLElement).style.transform = 'translate(-72px)';
    (document.querySelector('.cover-art_expanded') as HTMLElement).style.transform = 'translateY(-100%)';
  }

  function shrinkCoverArt() {
    (document.querySelector('.cover-art_expanded') as HTMLElement).style.transform = 'translateY(0)';
    (document.querySelector('.playing-widget') as HTMLElement).style.transform = 'translate(0px)';
  }

  return (
    <div className='playing-bar__container'>
      <div className="cover-art_expanded">
        <a href="/">
          <div>
            <img src="https://lab.possan.se/thirtify/images/placeholder-playlist.png" alt='cover art' />
          </div>
        </a>
        <button className='hide-button' onClick={shrinkCoverArt}>
          <IconHide />
        </button>
      </div>
      <footer className='playing-bar'>
        <div className='playing-bar__wrapper'>
          <div className='playing-widget'>
            <div className='cover-art'>
              <div className='cover-art__container'>
                <a href="/">
                  <div>
                    <img src="https://lab.possan.se/thirtify/images/placeholder-playlist.png" alt='cover art' />
                  </div>
                </a>
                <button className='show-button' onClick={expandCoverArt}>
                  <IconShow />
                </button>
              </div>
            </div>
            <div className="track-info">
              <div className='track-name'>
                <a href="/"></a>
              </div>
              <div className='track-author'>
                <a href="/"></a>
              </div>
            </div>
            <button className='add-button player-tool-button'>
              <IconHeart />
            </button>
          </div>
          <div className='player-controls'>
            <div className="player-controls__buttons">
              <div className="player-controls__buttons-left">
                <button className='player-tool-button'>
                  <IconShuffle />
                </button>
                <button className='player-tool-button'>
                  <IconButtonBack />
                </button>
              </div>
              <button className='play-pause-button' onClick={() => handlePlayingBarControls()}>
                <IconButtonPlay />
              </button>
              <div className="player-controls__buttons-right">
                <button className='player-tool-button'>
                  <IconButtonNext />
                </button>
                <button className='player-tool-button'>
                  <IconRepeat />
                </button>
              </div>
            </div>
            <div className="playback-bar">
              <div className='playback-position'>--:--</div>
              <div className="timeline">
                <div className="progress">
                  <div className="thumb"></div>
                </div>
              </div>
              <div className='playback-duration'>--:--</div>
            </div>
          </div>
          <div className='player-tools'>
            <button className='player-tool-button'>
              <IconMicrophone />
            </button>
            <button className='player-tool-button'>
              <IconQueue />
            </button>
            <div className="volume-bar">
              <button className='player-tool-button'>
                <IconVolumeOn />
              </button>
              <div className="volume-bar__range" onClick={() => handleVolumeClick()}>
                <div className="volume-bar__level">
                  <div className="thumb"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <audio className='playback' preload="metadata"></audio>
      </footer >
    </div>
  )
}

export default PlayingBar;
