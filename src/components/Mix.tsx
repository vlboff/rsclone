import React from "react";

interface IMix {
  name: string;
}

function Mix({ name }: IMix) {
  return (
    <div className="card">
      <div className="card-img"></div>
      <div className="card-name">{name}</div>
      <div className="card-dscr">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation
      </div>
    </div>
  );
}

export default Mix;
