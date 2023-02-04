import React, { useState } from "react";
import { IconPlayCard } from "../icons";

function Mix(props: { image: string; name: string; description: string }) {
  const [activeCardMode, setActiveCardMode] = useState("");

  return (
    <div
      className={`card ${activeCardMode}`}
      onMouseEnter={() => setActiveCardMode("hover")}
      onMouseLeave={() => setActiveCardMode("")}
    >
      <div className="card-img">
        <img src={props.image } alt="/" />
      </div>
      <div className="card-name">{props.name}</div>
      <div className="card-dscr">
        { props.description }
      </div>
      <div className={`card-play-btn ${activeCardMode}`}>
        <IconPlayCard />
      </div>
    </div>
  );
}

export default Mix;
