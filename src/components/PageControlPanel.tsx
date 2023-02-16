import React from "react";
import { IconPlayCard, IconHeart } from "../icons";

interface IPageControlPanel {
  color: string;
  setIconHeart: boolean;
}

function PageControlPanel({ color, setIconHeart }: IPageControlPanel) {
  return (
    <div>
      <div
        className="tracklist-gradient"
        style={{
          background: `linear-gradient(0deg, #22222260 0, ${color} 500%)`,
        }}
      ></div>
      <div className="control-panel">
        <div className="play-btn">
          <IconPlayCard height={28} width={28} />
        </div>
        {setIconHeart ? (
          <IconHeart height={32} width={32} className={"like-btn"} />
        ) : null}
      </div>
    </div>
  );
}

export default PageControlPanel;
