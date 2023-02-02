import React from "react";
import { IconSettings } from "../icons";

enum iconColor {
  white = "white",
  black = "black",
}

function SettingsBar() {
  const currentIconColor = iconColor.white;
  return (
    <div className="settings-bar">
      <div className="settings-bar-icon">
        <IconSettings fill={currentIconColor} />
      </div>
    </div>
  );
}

export default SettingsBar;
