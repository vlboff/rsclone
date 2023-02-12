import React from "react";

interface IPageHeader {
  color: string;
  image: string;
  title: string;
  name: string;
  description?: string;
  owner: string;
  followers?: string | number;
  age?: number;
  tracks: number;
  duration?: number;
}

function SongAlbumPlaylistPageHeader({
  color,
  image,
  title,
  name,
  description,
  owner,
  followers,
  age,
  tracks,
  duration,
}: IPageHeader) {
  return (
    <div
      className="page-header"
      style={{
        backgroundColor: color,
      }}
    >
      <img
        src={image}
        alt="cover"
        className="page-header_cover"
        crossOrigin="anonymous"
      />
      <div className="page-header_item">
        <h2 className="page-header_title">{title}</h2>
        <h1 className="page-header_name">{name}</h1>
        <p className="page-header_dscr">{description}</p>
        <div className="page-header_info">
          <span className="page-header_owner">{owner}</span>
          <span className="page-header_followers">
            {followers ? followers : ""}
          </span>
          <span className="page-header_age">{age ? age : ""}</span>
          <span className="page-header_tracks">
            {tracks ? `${tracks} songs` : ""}
          </span>
          <span className="page-header_duration">
            {duration ? duration : ""}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SongAlbumPlaylistPageHeader;
