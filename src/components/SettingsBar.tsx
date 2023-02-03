import React, { useEffect, useState } from "react";
import { IconSettings } from "../icons";

enum iconColor {
  white = "white",
  black = "black",
}

function SettingsBar() {
  const currentIconColor = iconColor.white;

  const CLIENT_ID = "c670609555524d21a059cc5ba625d29f";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token") as string;

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        ?.split("=")[1] as string;

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  return (
    <div className="settings-bar">
      {!token ? (
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}`}
        >
          <button className="login-btn">Login</button>
        </a>
      ) : (
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      )}

      <div className="settings-bar-icon">
        <IconSettings fill={currentIconColor} />
      </div>
    </div>
  );
}

export default SettingsBar;
