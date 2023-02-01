import React from 'react';
import { ButtonBack, ButtonNext, ButtonPlay, Heart, Hide, Microphone, Queue, Repeat, Show, Shuffle, VolumeOn } from '../../icons';

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
    <footer className='playing-bar'>
      <div className="cover-art_expanded">
        <a href="/">
          <div>
            <img src="https://i.scdn.co/image/ab67706f00000002708c623e2e1df4607775381b" alt='cover art' />
          </div>
        </a>
        <button className='hide-button' onClick={shrinkCoverArt}>
          <Hide />
        </button>
      </div>
      <div className='playing-bar__wrapper'>
        <div className='playing-widget'>
          <div className='cover-art'>
            <div className='cover-art__container'>
              <a href="/">
                <div>
                  <img src="https://i.scdn.co/image/ab67706f00000002708c623e2e1df4607775381b" alt='cover art' />
                </div>
              </a>
              <button className='show-button' onClick={expandCoverArt}>
                <Show />
              </button>
            </div>
          </div>
          <div className="track-info">
            <div className='track-name'>
              <a href="/">Lorem, ipsum dolor.</a>
            </div>
            <div className='track-author'>
              <a href="/">Lorem, ipsum.</a>
            </div>
          </div>
          <button className='add-button player-tool-button'>
            <Heart />
          </button>
        </div>
        <div className='player-controls'>
          <div className="player-controls__buttons">
            <div className="player-controls__buttons-left">
              <button className='player-tool-button'>
                <Shuffle />
              </button>
              <button className='player-tool-button'>
                <ButtonBack />
              </button>
            </div>
            <button className='play-pause-button'>
              <ButtonPlay />
            </button>
            <div className="player-controls__buttons-right">
              <button className='player-tool-button'>
                <ButtonNext />
              </button>
              <button className='player-tool-button'>
                <Repeat />
              </button>
            </div>
          </div>
          <div className="playback-bar">
            <div className='playback-position'>1:45</div>
            <input type="range" id="playback-range__input" />
            <div className='playback-duration'>3:51</div>
          </div>
        </div>
        <div className='player-tools'>
          <button className='player-tool-button'>
            <Microphone />
          </button>
          <button className='player-tool-button'>
            <Queue />
          </button>
          <div className="volume-bar">
            <button className='player-tool-button'>
              <VolumeOn />
            </button>
            <input type="range" id="volume-bar__range" />
          </div>
        </div>
      </div>
    </footer >
  )
}

export default PlayingBar;
