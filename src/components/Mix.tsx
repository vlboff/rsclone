import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IconPlayCard } from "../icons";

interface IMix {
  image: string;
  name: string;
  description: string;
  playlistID?: string;
  setPlaylistsID?: React.Dispatch<React.SetStateAction<string>>;
  artistID?: string;
  setArtistID?: React.Dispatch<React.SetStateAction<string>>;
  albumID?: string;
  setAlbumID?: React.Dispatch<React.SetStateAction<string>>;
  setRandomColor: React.Dispatch<React.SetStateAction<string>>;
  circle?: boolean;
}

function Mix({
  image,
  name,
  description,
  playlistID,
  setPlaylistsID,
  artistID,
  setArtistID,
  albumID,
  setAlbumID,
  setRandomColor,
  circle,
}: IMix) {
  const [activeCardMode, setActiveCardMode] = useState("");

  const dscrWithoutLinks = (description: string) => {
    if (description.includes("<")) {
      const firstPart = description.slice(0, description.indexOf("<"));
      const intermediatePart = description.slice(description.indexOf(">") + 1);
      const secondPart = intermediatePart.slice(
        0,
        intermediatePart.indexOf("<")
      );
      return `${firstPart} ${secondPart}`;
    } else {
      return description;
    }
  };

  const playMusic = () => {
    // play
  };

  const setIdValue = () => {
    if (setPlaylistsID && playlistID) {
      setPlaylistsID(playlistID);
    } else if (setArtistID && artistID) {
      setArtistID(artistID);
    } else if (setAlbumID && albumID) {
      setAlbumID(albumID);
    }
  };

  const setPath = () => {
    if (setPlaylistsID && playlistID) {
      return `/playlist/${playlistID}`;
    } else if (setArtistID && artistID) {
      return `/artist/${artistID}`;
    } else if (setAlbumID && albumID) {
      return `/album/${albumID}`;
    } else {
      return "/";
    }
  };

  return (
    <div
      className="card-wrapper"
      onMouseEnter={() => setActiveCardMode("hover")}
      onMouseLeave={() => setActiveCardMode("")}
    >
      <div className={`card-play-btn ${activeCardMode}`}>
        <div className="circle" onClick={playMusic}>
          <IconPlayCard />
        </div>
      </div>

      <Link
        to={setPath()}
        className={"playlist-link"}
        onClick={() =>
          setRandomColor(`#${Math.random().toString(16).slice(3, 9)}`)
        }
      >
        <div className={`card ${activeCardMode}`} onClick={() => setIdValue()}>
          <div
            className="card-img"
            style={circle ? { borderRadius: "50%" } : { borderRadius: "none" }}
          >
            <img
              src={image}
              alt="/"
              style={
                circle ? { borderRadius: "50%" } : { borderRadius: "none" }
              }
            />
          </div>
          <div className="card-text">
            <div className="card-name">{name}</div>
            <div className="card-dscr">{dscrWithoutLinks(description)}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Mix;
