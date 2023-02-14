import React from "react";
import { Link } from "react-router-dom";
import { IconButtonPlay, IconHeart, IconMoreInfo } from "../../icons";
import { playPauseTrack, selectAndGetTrack } from "../../utils/playback";

function SearchResultSong(props: {
  image: string;
  name: string;
  author: string;
  duration: string | number;
  id: string;
  setTrackID: React.Dispatch<React.SetStateAction<string>>;
  setRandomColor: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div
      className="search-result-song track"
      id={props.id}
      onClick={() => selectAndGetTrack(props.id)}
    >
      <div className="search-result-song__image">
        <img src={props.image} alt="/" />
        <button
          className="player-tool-button play-pause-song"
          onClick={() => {
            playPauseTrack(props.id);
          }}
        >
          <IconButtonPlay />
        </button>
      </div>
      <div className="track-info">
        <div className="track-name">
          <Link
            to={`/track/${props.id}`}
            className="track-name"
            onClick={() => {
              props.setRandomColor(
                `#${Math.random().toString(16).slice(3, 9)}`
              );
              if (props.id && props.setTrackID) {
                props.setTrackID(props.id);
              }
            }}
          >
            <p>{props.name}</p>
          </Link>
          {/* <a href="/">{props.name}</a> */}
        </div>
        <div className="track-author">
          <a href="/">{props.author}</a>
        </div>
      </div>
      <button className="player-tool-button">
        <IconHeart />
      </button>
      <div>{props.duration}</div>
      <button className="player-tool-button">
        <IconMoreInfo />
      </button>
    </div>
  );
}

export default SearchResultSong;
