import React from "react";
import { IconSettings, ArrowRightIcon, ArrowLeftIcon } from "../icons";
import SearchBar from './SearchBar';
import ButtonMenu from './ButtonMenu';

enum iconColor {
  white = "white",
  black = "black",
}

function SettingsBar() {
  const currentIconColor = iconColor.white;

  return (
    <div className="settings-bar">
      <div className='settings-bar__block-left'>
        <div className="settings-bar__arrows">
          <button className='arrow btn-reset'><ArrowLeftIcon className='arrow--left'/></button>
          <button className='arrow btn-reset'><ArrowRightIcon className='arrow--right'/></button>
        </div>
        <SearchBar/>
      </div>
      <ButtonMenu/>
      {/* <div className="settings-bar-icon">
        <IconSettings fill={currentIconColor} />
      </div> */}
    </div>
  );
}

export default SettingsBar;
