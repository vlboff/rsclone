import React from 'react'
import { getUserSavedTracks } from '../api/getUserSavedTracks';
import { ISavedTracks, IResponseTrack } from '../components/interfaces/apiInterfaces';
import { useEffect, useState } from 'react';
import { IconHeart, IconPlayCard, IconClock, IconPreloader } from "../icons";
import TracklistRow from "../components/TracklistRow";

interface ISavedTracksPage {
    randomColor: string;
}

function SavedTracksPage({randomColor}: ISavedTracksPage) {
    const token = window.localStorage.getItem('token');
    const [savedTracks, setSavedTracks] = useState<ISavedTracks | null>(null)

    useEffect(() => {
        async function getSavedTracks() {
            setSavedTracks(await getUserSavedTracks(token))
        }
        getSavedTracks()
    }, [])

    return savedTracks ? (
        <div className="playlist-page">
          <div
            className="playlist-header"
            style={{
              backgroundColor: '#5135AD',
            }}
          >
            <img
              src='https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png'
              alt="cover"
              className="playlist-header_cover"
              crossOrigin="anonymous"
            />
            <div className="playlist-header_item">
              <h2 className="playlist_title">playlist</h2>
              <h1 className="playlist_name">Liked Songs</h1>
              <p className="playlist_dscr"></p>
              <div className="playlist_info">
                {/* <span className="playlist_owner"></span>
                <span className="playlist_followers"></span> */}
                <span className="playlist_tracks">{`${
                  savedTracks ? savedTracks.total : 0
                } songs`}</span>
              </div>
            </div>
          </div>
    
          <div className="tracklist-table">
            <div
              className="tracklist-gradient"
              style={{
                background: `linear-gradient(0deg, #22222260 0, #5135AD 500%)`,
              }}
            ></div>
            <div className="control-panel">
              <div className="play-btn">
                <IconPlayCard height={28} width={28} />
              </div>
              <IconHeart height={32} width={32} className={"like-btn"} />
            </div>
            <div className="tracklist-table_title">
              <div className="title-number">#</div>
              <div className="title-info">title</div>
              <div className="title-album">album</div>
              <div className="title-date">date added</div>
              <div className="title-time">
                <IconClock fill="#b3b3b3" />
              </div>
            </div>
            <div className="line"></div>
            {savedTracks.items.map((item, index) => (
              <TracklistRow
                key={`${item.track.name}${Math.random()}`}
                number={index + 1}
                image={item.track.album.images[0].url}
                name={item.track.name}
                artist={item.track.artists[0].name}
                album={item.track.album.name}
                data={item.added_at}
                duration={item.track.duration_ms}
                id={item.track.id}
                addedTrack={true}
                setSavedTracks={setSavedTracks}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="preloader">
          <IconPreloader width={50} height={50} />
        </div>
      );
}

export default SavedTracksPage