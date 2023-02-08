import React from "react";

interface ITracklistRow {
  number: number;
  image: string;
  name: string;
  artist: string;
  album: string;
  data: string;
  duration: number;
}

function TracklistRow({
  number,
  image,
  name,
  artist,
  album,
  data,
  duration,
}: ITracklistRow) {
  return (
    <div className="tracklist-row">
      <div className="track-number">{number}</div>
      <div className="track-info">
        <img src={image} alt="album_img" className="track-img" />
        <div className="track-dscr">
          <p className="track-name">{name}</p>
          <p className="track-artist">{artist}</p>
        </div>
      </div>
      <div className="track-album">{album}</div>
      <div className="track-data">{data}</div>
      <div className="track-time">{duration}</div>
    </div>
  );
}

export default TracklistRow;
