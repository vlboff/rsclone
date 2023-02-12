import React from "react";
import { IconPlayCard, IconHeart } from "../icons";

interface IPageControlPanel {
  color: string;
}

function PageControlPanel({ color }: IPageControlPanel) {
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
        <IconHeart height={32} width={32} className={"like-btn"} />
      </div>
    </div>
  );
}

export default PageControlPanel;
