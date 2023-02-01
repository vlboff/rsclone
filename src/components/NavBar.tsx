import React, { useEffect, useState } from "react";
import {
  SpotifyLogo,
  HomeIcon,
  HomeIconActive,
  SearchIcon,
  SearchIconActive,
  AddPlayList,
} from "../icons";

interface IListItem {
  icon: React.SVGProps<SVGSVGElement>;
  activIcon?: React.SVGProps<SVGSVGElement>;
  name: string;
}

enum listItemNames {
  home = "Home",
  search = "Search",
  createPlaylist = "Create Playlist",
}

enum iconColor {
  white = "white",
  black = "black",
}

function NavBar() {
  const currentIconColor = iconColor.white;

  const listItem: IListItem[] = [
    {
      icon: <HomeIcon fill={currentIconColor} />,
      activIcon: <HomeIconActive fill={currentIconColor} />,
      name: listItemNames.home,
    },
    {
      icon: <SearchIcon fill={currentIconColor} />,
      activIcon: <SearchIconActive fill={currentIconColor} />,
      name: listItemNames.search,
    },
    {
      icon: <AddPlayList fill={currentIconColor} />,
      activIcon: <AddPlayList fill={currentIconColor} />,
      name: listItemNames.createPlaylist,
    },
  ];

  const [activeMode, setActiveMode] = useState<string>(listItem[0].name);

  const isActive = (item: IListItem): React.SVGProps<SVGSVGElement> => {
    if (item.name === activeMode) {
      return item.activIcon as React.SVGProps<SVGSVGElement>;
    } else {
      return item.icon as React.SVGProps<SVGSVGElement>;
    }
  };

  return (
    <nav className="nav-bar">
      <div className="nav-bar_logo">
        <SpotifyLogo fill="white" stroke="white" />
      </div>
      <ul>
        {listItem.map((item) => (
          <li
            key={item.name}
            onClick={() => setActiveMode(item.name)}
            className={item.name === activeMode ? "active" : ""}
          >
            <>
              {isActive(item)}
              {item.name}
            </>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
