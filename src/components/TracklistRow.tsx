import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IconPlayTracklistRow, IconHeart } from "../icons";
import { IconHeart, IconButtonPlay, IconButtonPause } from "../icons";
import { playPauseTrack, selectAndGetTrack } from "../utils/playback";
import { getTracklistRowData, convertTrackTime } from "../utils/utils";


interface ITracklistRow {
  number: number;
  image?: string;
  name: string;
  trackID: string;
  setTrackID: React.Dispatch<React.SetStateAction<string>>;
  artist?: string;
  artistID?: string;
  setArtistID?: React.Dispatch<React.SetStateAction<string>>;
  album?: string;
  albumID?: string;
  setAlbumID?: React.Dispatch<React.SetStateAction<string>>;
  data?: string;
  duration: number;
  setRandomColor: React.Dispatch<React.SetStateAction<string>>;
  id: string;
  isPlaying: boolean
}

interface Imounths {
  [key: number]: string;
}

function TracklistRow({
  number,
  image,
  name,
  trackID,
  setTrackID,
  artist,
  artistID,
  setArtistID,
  album,
  albumID,
  setAlbumID,
  data,
  duration,
  setRandomColor,
  id,
  isPlaying
}: ITracklistRow) {

  const getData = (date: string) => {
    let dateAdded = new Date(date);
    const mounths: Imounths = {
      0: "Jan",
      1: "Feb",
      2: "Mar",
      3: "Apr",
      4: "May",
      5: "Jun",
      6: "Jul",
      7: "Aug",
      8: "Sep",
      9: "Oct",
      10: "Nov",
      11: "Dec",
    };

    return `${
      mounths[dateAdded.getMonth()]
    } ${dateAdded.getDate()}, ${dateAdded.getFullYear()}`;
  };

  const getTime = (duration: number) => {
    const seconds = Math.round((duration / 1000) % 60);
    const minutes = Math.round((duration / (1000 * 60)) % 60);

    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const audio = document.querySelector('.playback') as HTMLAudioElement;


  return (
    <div
      className="tracklist-row tracklist-song"
      id={id}
      onClick={() => selectAndGetTrack(id)}
    >
      <div className="track-number">
        <span className="number">{number}</span>
        <button className='player-tool-button play-pause-song' onClick={() => { playPauseTrack(id) }}>
          {!isPlaying ? <IconButtonPlay/> : <IconButtonPause/>}
        </button>
      </div>
      <div className="track-info">
        {image ? <img src={image} alt="album_img" className="track-img" /> : ""}
        <div className="track-dscr">
          <Link
            to={`/track/${trackID}`}
            className="track-name"
            onClick={() => {
              setRandomColor(`#${Math.random().toString(16).slice(3, 9)}`);
              if (trackID && setTrackID) {
                setTrackID(trackID);
              }
            }}
          >
            <p>{name}</p>
          </Link>
          <Link
            to={`/artist/${artistID}`}
            className="track-artist"
            onClick={() => {
              setRandomColor(`#${Math.random().toString(16).slice(3, 9)}`);
              if (artistID && setArtistID) {
                setArtistID(artistID);
              }
            }}
          >
            <p>{artist}</p>
          </Link>
        </div>
      </div>
      <Link
        to={`/album/${albumID}`}
        className="track-album"
        onClick={() => {
          setRandomColor(`#${Math.random().toString(16).slice(3, 9)}`);
          if (albumID && setAlbumID) {
            setAlbumID(albumID);
          }
        }}
      >
        {album ? album : ""}
      </Link>
      <div className="track-data">{data ? getTracklistRowData(data) : ""}</div>

      <div className="last-block">
        <div className="like-btn">
          <IconHeart />
        </div>
        <div className="track-time">{convertTrackTime(duration)}</div>
      </div>
    </div>
  );
}

export default TracklistRow;
