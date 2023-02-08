import React, { useEffect, useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon, IconPlayCard } from "../icons";
import ButtonMenu from "./ButtonMenu";

enum Paths {
  playlist = "playlist",
  artist = "artist",
  album = "album",
}

interface ISettingsBar {
  scrollHeight: number;
  playlistName: string;
}

function SettingsBar({ scrollHeight, playlistName }: ISettingsBar) {
  const [activeMode, setActiveMode] = useState<string>("");

  useEffect(() => {
    const path = window.location.pathname.slice(
      1,
      window.location.pathname.slice(1).indexOf("/") + 1
    );

    if (scrollHeight > 360 && path === Paths.playlist) {
      setActiveMode("active-bar");
    } else {
      setActiveMode("");
    }
  }, [scrollHeight]);

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
        <div className={`settings-bar__control  ${activeMode}`}>
          <div className="play-btn">
            <IconPlayCard height={28} width={28} />
          </div>
          <p className="playlist-name">{playlistName}</p>
        </div>
      </div>
      <ButtonMenu />
    </div>
  );
}

export default SettingsBar;
