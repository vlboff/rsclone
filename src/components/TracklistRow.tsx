import React from "react";
import { Link } from "react-router-dom";
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
  isPlaying: boolean
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
  isPlaying
}: ITracklistRow) {

  return (
    <div
      className="tracklist-row tracklist-song"
      id={trackID}
      onClick={() => selectAndGetTrack(trackID)}
    >
      <div className="track-number">
        <span className="number">{number}</span>
        <button className='player-tool-button play-pause-song' onClick={() => { playPauseTrack(trackID) }}>
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
