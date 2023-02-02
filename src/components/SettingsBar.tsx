import React from "react";
import { SettingsIcon } from "../icons";

enum iconColor {
  white = "white",
  black = "black",
}

function SettingsBar() {
  const currentIconColor = iconColor.white;
  return (
    <div className="settings-bar">
      <div className="settings-bar-icon">
        <SettingsIcon fill={currentIconColor} />
      </div>
    </div>
  );
}

export default SettingsBar;
