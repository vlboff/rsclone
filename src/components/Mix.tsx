import React, { useState } from "react";
import { PlayCardIcon } from "../icons";

interface IMix {
  name: string;
}

function Mix({ name }: IMix) {
  const [activeCardMode, setActiveCardMode] = useState("");

  return (
    <div
      className={`card ${activeCardMode}`}
      onMouseEnter={() => setActiveCardMode("hover")}
      onMouseLeave={() => setActiveCardMode("")}
    >
      <div className="card-img"></div>
      <div className="card-name">{name}</div>
      <div className="card-dscr">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation
      </div>
      <div className={`card-play-btn ${activeCardMode}`}>
        <PlayCardIcon />
      </div>
    </div>
  );
}

export default Mix;
