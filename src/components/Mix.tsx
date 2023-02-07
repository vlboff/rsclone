import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IconPlayCard } from "../icons";

interface IMix {
  image: string;
  name: string;
  description: string;
  id: string;
  setPlaylistsID: React.Dispatch<React.SetStateAction<string>>;
}

function Mix({ image, name, description, id, setPlaylistsID }: IMix) {
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

      <Link to={"/playlist"}>
        <div
          className={`card ${activeCardMode}`}
          onClick={() => setPlaylistsID(id)}
        >
          <div className="card-img">
            <img src={image} alt="/" />
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
