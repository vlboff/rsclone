import React from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "../icons";
import ButtonMenu from "./ButtonMenu";

function SettingsBar() {
  return (
    <div className="settings-bar">
      <div className="settings-bar__block-left">
        <div className="settings-bar__arrows">
          <button className="arrow btn-reset">
            <ArrowLeftIcon className="arrow--left" />
          </button>
          <button className="arrow btn-reset">
            <ArrowRightIcon className="arrow--right" />
          </button>
        </div>
      </div>
      <ButtonMenu />
    </div>
  );
}

export default SettingsBar;
