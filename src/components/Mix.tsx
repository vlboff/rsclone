import React, { useState } from "react";
import { IconPlayCard } from "../icons";

function Mix(props: { image: string; name: string; description: string }) {
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

  return (
    <div
      className={`card ${activeCardMode}`}
      onMouseEnter={() => setActiveCardMode("hover")}
      onMouseLeave={() => setActiveCardMode("")}
    >
      <div className="card-img">
        <img src={props.image} alt="/" />
      </div>
      <div className="card-text">
        <div className="card-name">{props.name}</div>
        <div className="card-dscr">{dscrWithoutLinks(props.description)}</div>
      </div>
      <div className={`card-play-btn ${activeCardMode}`}>
        <IconPlayCard />
      </div>
    </div>
  );
}

export default Mix;
