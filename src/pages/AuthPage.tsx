import React from "react";
import { IconRSSLogo, IconSpotifyLogoWithoutName } from "../icons";

function AuthPage(props: { AUTH_ENDPOINT: string; CLIENT_ID: string; REDIRECT_URI: string; RESPONSE_TYPE: string; }) {

  return (
    <div className="auth-page">
      <div className="auth-page__container">
        <div className="auth-page__login">
          <div className="spotify-logo">
            <IconSpotifyLogoWithoutName /> SpotifyClone
          </div>
          <p className="auth-page__login__description">SpotifyClone is the result of the rsclone team task, performed within the Rolling Scopes school JavaScript/Front-end 2022Q3 course</p>
          <div className="rs-school-logo">
            <a href="https://rs.school/js/" target="_blank" rel="noreferrer">
              <IconRSSLogo />
            </a>
          </div>
          <button className="login-btn"><a href={`${props.AUTH_ENDPOINT}?client_id=${props.CLIENT_ID}&redirect_uri=${props.REDIRECT_URI}&response_type=${props.RESPONSE_TYPE}&scope=user-library-read,playlist-modify-public,user-library-modify`}>Login to Spotify</a></button>
        </div>
        <div className="auth-page__preview"></div>
      </div>
    </div>
  )

}

export default AuthPage;
