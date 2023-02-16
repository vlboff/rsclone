import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButtonBack, IconButtonNext, IconButtonPlay, IconHeart, IconHide, IconMicrophone, IconQueue, IconRepeat, IconShow, IconShuffle, IconVolumeOn } from '../../icons';
import { nextTrack, playPauseTrack, prevTrack, repeatTrack, shuffleTracks } from '../../utils/playback';

interface IPlayingBar {
  setTrackID: React.Dispatch<React.SetStateAction<string>>;
  setArtistID: React.Dispatch<React.SetStateAction<string>>;
  setRandomColor: React.Dispatch<React.SetStateAction<string>>;
}

function PlayingBar({setTrackID, setArtistID, setRandomColor}: IPlayingBar) {
  function expandCoverArt() {
    (document.querySelector('.playing-widget') as HTMLElement).style.transform = 'translate(-72px)';
    (document.querySelector('.cover-art_expanded') as HTMLElement).style.transform = 'translateY(-100%)';
  }

  function shrinkCoverArt() {
    (document.querySelector('.cover-art_expanded') as HTMLElement).style.transform = 'translateY(0)';
    (document.querySelector('.playing-widget') as HTMLElement).style.transform = 'translate(0px)';
  }

  const trackName = (document.querySelector('.playing-bar .track-name') as HTMLElement).querySelector('a') as unknown as HTMLLinkElement;
  const trackAuthor = (document.querySelector('.playing-bar .track-author') as HTMLElement).querySelector('a') as unknown as HTMLLinkElement;

  const trackAuthorLink = (document.querySelector('.playing-bar .track-author') as HTMLElement).querySelector('.track-author_link') as HTMLLinkElement;
  const trackNameLink = (document.querySelector('.playing-bar .track-name') as HTMLElement).querySelector('.track-name_link') as HTMLLinkElement;

useEffect(() => {
  if (trackName.textContent) {
    if (trackName.textContent.length > 0) {
      setTrackID(trackNameLink.href.slice(trackNameLink.href.lastIndexOf('/') + 1));
    }
  }

  if (trackAuthor.textContent) {
    if (trackAuthor.textContent.length > 0) {
      setArtistID(trackAuthorLink.href.slice(trackAuthorLink.href.lastIndexOf('/') + 1));
    }
  }
}, [trackName, trackAuthor])


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
              <div className='track-name' onClick={() => setTrackID(trackNameLink.href.slice(trackNameLink.href.lastIndexOf('/') + 1))}>
                <Link className="track-name_link" to={`/track/${trackNameLink.href.slice(trackNameLink.href.lastIndexOf('/') + 1)}`} onClick={() => {
                  setRandomColor(`#${Math.random().toString(16).slice(3, 9)}`);
                }}></Link>
              </div>
              <div className='track-author' onClick={() => setArtistID(trackAuthorLink.href.slice(trackAuthorLink.href.lastIndexOf('/') + 1))}>
                <Link className="track-author_link" to={`/artist/${trackAuthorLink.href.slice(trackAuthorLink.href.lastIndexOf('/') + 1)}`} onClick={() => {
                  setRandomColor(`#${Math.random().toString(16).slice(3, 9)}`);
                }}></Link>
              </div>
            </div>
            <button className='add-button player-tool-button'>
              <IconHeart />
            </button>
          </div>
          <div className='player-controls'>
            <div className="player-controls__buttons">
              <div className="player-controls__buttons-left">
                <button className='player-tool-button shuffle' onClick={() => shuffleTracks()}>
                  <IconShuffle />
                </button>
                <button className='player-tool-button' id='prev' onClick={() => prevTrack()}>
                  <IconButtonBack />
                </button>
              </div>
              <button className='play-pause-button' onClick={() => {
                const id = (document.querySelector('.playback') as HTMLAudioElement).dataset.track_id!;
                playPauseTrack(id);
                setTrackID(trackNameLink.href.slice(trackNameLink.href.lastIndexOf('/') + 1));
                setArtistID(trackAuthorLink.href.slice(trackAuthorLink.href.lastIndexOf('/') + 1));
              }}>
                <IconButtonPlay />
              </button>
              <div className="player-controls__buttons-right">
                <button className='player-tool-button next' id='next' onClick={() => nextTrack()}>
                  <IconButtonNext />
                </button>
                <button className='player-tool-button repeat' onClick={() => repeatTrack()}>
                  <IconRepeat />
                </button>
              </div>
            </div>
            <div className="playback-bar">
              <div className='playback-position'>--:--</div>
              <div className="timeline">
                <input type="range" id="timeline__range" />
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
              <div className="volume-bar__range">
                <input type="range" id="volume-bar__range-input" />
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
