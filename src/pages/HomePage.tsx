import React from "react";
import MixesBlock from "../components/MixesBlock";
import SettingsBar from "../components/SettingsBar";

function HomePage() {
  const blockName = [
    "Today's biggest hits",
    "Featured Charts",
    "Workout",
    "Fresh new music",
    "Mood",
  ];

  return (
    <div className="home-page">
      <SettingsBar />
      <div className="mixes-block-wrapper">
        {blockName.map((item) => (
          <MixesBlock name={item} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
