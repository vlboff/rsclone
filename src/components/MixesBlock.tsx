import React from "react";
import Mix from "./Mix";

interface IMixesBlock {
  name: string;
}

function MixesBlock({ name }: IMixesBlock) {
  const mixName = [
    "Rock This",
    "Techno Bunker",
    "Pop Rising",
    "Today's Top Hits",
    "Extreme Metal Workout",
    "Hype",
    "Motivation Mix",
    "Folk Feast",
  ];
  return (
    <div className="mixes-block">
      <div className="mixes-block-header">
        <p className="mixes-block-header-title">{name}</p>
        <p className="mixes-block-header-show">show all</p>
      </div>
      <div className="mixes">
        {mixName.map((item) => (
          <Mix name={item} />
        ))}
      </div>
    </div>
  );
}

export default MixesBlock;
