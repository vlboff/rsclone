import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IconPlayCard } from "../icons";
import { removePlaylist } from "../api/removePlaylist";
import { getUserPlaylist } from "../api/getUserPlaylist";
import { getUserId } from '../api/getUserId';

interface IMix {
  image: string;
  name: string;
  description: string;
  id: string;
  setPlaylistsID: React.Dispatch<React.SetStateAction<string>>;
  setRandomColor: React.Dispatch<React.SetStateAction<string>>;
  userId?: string;
  setMyPlaylists?: React.Dispatch<React.SetStateAction<[]>>;
}

function Mix({
  image,
  name,
  description,
  id,
  setPlaylistsID,
  setRandomColor,
  userId,
  setMyPlaylists
}: IMix) {
  const [activeCardMode, setActiveCardMode] = useState("");
  const [active, setActive] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const token = window.localStorage.getItem('token');

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

  document.addEventListener('click', () => {
    if(active === false) {
      setActive(!active)
    }
  })

  const playMusic = () => {
    // play
  };

  const showContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setActive(!active)
    const newPosition = {
      x: e.pageX,
      y: e.pageY,
    };
    setPosition(newPosition);
  }

  const deletePlaylist = async (e: React.MouseEvent<HTMLElement>) => {
    await removePlaylist(id, token)
    setActive(!active)
    if(setMyPlaylists !== undefined && userId !== undefined) {
      setMyPlaylists(await getUserPlaylist(token, userId))
    }
  }
 
  return (
    <>
      <div
      className="card-wrapper"
      onMouseEnter={() => setActiveCardMode("hover")}
      onMouseLeave={() => setActiveCardMode("")}
      onContextMenu={showContextMenu}
    >
      <div className={`card-play-btn ${activeCardMode}`}>
        <div className="circle" onClick={playMusic}>
          <IconPlayCard />
        </div>
      </div>

      <Link
        to={`/playlist/${id}`}
        className={"playlist-link"}
        onClick={() =>
          setRandomColor(`#${Math.random().toString(16).slice(3, 9)}`)
        }
      >
        <div
          className={`card ${activeCardMode}`}
          onClick={() => setPlaylistsID(id)}
        >
          <div className="card-img">
            <img src={image ? image : 'https://lab.possan.se/thirtify/images/placeholder-playlist.png'} alt="/" />
          </div>
          <div className="card-text">
            <div className="card-name">{name}</div>
            <div className="card-dscr">{dscrWithoutLinks(description)}</div>
          </div>
        </div>
      </Link>
      </div>
      
      {setMyPlaylists !== undefined
      ? 
      <div style={{ top: position.y, left: position.x }} className={active ? 'modal-context hidden' : 'modal-context'} hidden>
        <button className='modal-btn context-btn' onClick={deletePlaylist} >Delete</button>
      </div>
      : ''}
    </>
    
  );
}

export default Mix;
