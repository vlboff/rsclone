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
      {blockName.map((item) => (
        <MixesBlock name={item} />
      ))}
    </div>
  );
}

export default HomePage;
