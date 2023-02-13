import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IconPlayTracklistRow, IconHeart } from "../icons";
import { getTracklistRowData, convertTrackTime } from "../utils/utils";

interface ITracklistRow {
  number: number;
  image?: string;
  name: string;
  trackID: string;
  artist: string;
  artistID: string;
  album?: string;
  albumID?: string;
  setAlbumID?: React.Dispatch<React.SetStateAction<string>>;
  data?: string;
  duration: number;
  setRandomColor: React.Dispatch<React.SetStateAction<string>>;
}

function TracklistRow({
  number,
  image,
  name,
  trackID,
  artist,
  artistID,
  album,
  albumID,
  setAlbumID,
  data,
  duration,
  setRandomColor,
}: ITracklistRow) {
  const [hover, setHover] = useState("");

  return (
    <div
      className={`tracklist-row ${hover}`}
      onMouseEnter={() => setHover("tracklist-hover")}
      onMouseLeave={() => setHover("")}
    >
      <div className="track-number">
        {hover ? <IconPlayTracklistRow fill="#FFFFFF" /> : number}
      </div>
      <div className="track-info">
        {image ? <img src={image} alt="album_img" className="track-img" /> : ""}
        <div className="track-dscr">
          <p className="track-name">{name}</p>
          <p className="track-artist">{artist}</p>
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
        <div
          className={`like-btn`}
          style={hover ? { visibility: "visible" } : { visibility: "hidden" }}
        >
          <IconHeart />
        </div>
        <div className="track-time">{convertTrackTime(duration)}</div>
      </div>
    </div>
  );
}

export default TracklistRow;
