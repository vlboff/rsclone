import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  IconSpotifyLogo,
  IconHome,
  IconHomeActive,
  IconSearch,
  IconSearchActive,
  IconAddPlayListIcon,
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
      icon: <IconHome fill={currentIconColor} />,
      activIcon: <IconHomeActive fill={currentIconColor} />,
      name: listItemNames.home,
    },
    {
      icon: <IconSearch fill={currentIconColor} />,
      activIcon: <IconSearchActive fill={currentIconColor} />,
      name: listItemNames.search,
    },
    {
      icon: <IconAddPlayListIcon fill={currentIconColor} />,
      activIcon: <IconAddPlayListIcon fill={currentIconColor} />,
      name: listItemNames.createPlaylist,
    },
  ];

  const [activeMode, setActiveMode] = useState<string>(listItem[0].name);

  const isActive = (item: IListItem): React.SVGProps<SVGSVGElement> =>
    item.name === activeMode
      ? (item.activIcon as React.SVGProps<SVGSVGElement>)
      : (item.icon as React.SVGProps<SVGSVGElement>);



  return (
    <nav className="nav-bar">
      <div className="nav-bar_logo">
        <IconSpotifyLogo fill="white" stroke="white" />
      </div>
      <ul>
        {listItem.map((item) => (
          <li
            key={item.name}
            onClick={() => setActiveMode(item.name)}
            className={item.name === activeMode ? "active" : ""}
          >
            <NavLink to={item.name === 'Search' ? 'search' : ''}>
              <>{isActive(item)}</>
              <p>{item.name}</p>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
