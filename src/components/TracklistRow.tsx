import React, { useState } from "react";
import { IconPlayTracklistRow, IconHeart } from "../icons";

interface ITracklistRow {
  number: number;
  image: string;
  name: string;
  artist: string;
  album: string;
  data: string;
  duration: number;
}

interface Imounths {
  [key: number]: string;
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
  const [hover, setHover] = useState("");

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
        <img src={image} alt="album_img" className="track-img" />
        <div className="track-dscr">
          <p className="track-name">{name}</p>
          <p className="track-artist">{artist}</p>
        </div>
      </div>
      <div className="track-album">{album}</div>
      <div className="track-data">{getData(data)}</div>
      <div className="last-block">
        <div
          className={`like-btn`}
          style={hover ? { visibility: "visible" } : { visibility: "hidden" }}
        >
          <IconHeart />
        </div>
        <div className="track-time">{getTime(duration)}</div>
      </div>
    </div>
  );
}

export default TracklistRow;