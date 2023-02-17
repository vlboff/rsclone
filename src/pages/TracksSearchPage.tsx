import React, { useEffect, useState } from "react";
import { searchItems } from "../api/searchItems";
import { IResponseTrack } from "../components/interfaces/apiInterfaces";
import TracklistRow from "../components/TracklistRow";
import { IconClock } from "../icons";

interface ITracksSearchPage {
  searchKey: string;
  setTrackID: React.Dispatch<React.SetStateAction<string>>;
  setAlbumID: React.Dispatch<React.SetStateAction<string>>;
  setRandomColor: React.Dispatch<React.SetStateAction<string>>;
}

function TracksSearchPage({
  searchKey,
  setTrackID,
  setAlbumID,
  setRandomColor,
}: ITracksSearchPage) {
  const token = window.localStorage.getItem("token");
  const [tracks, setTracks] = useState<IResponseTrack[] | null>(null);
  const audio = document.querySelector('.playback') as HTMLAudioElement;

  useEffect(() => {
    const foo = async () => {
      const data = await searchItems(searchKey, token);
      setTracks(data.tracks.items);
    };
    foo();
  }, [searchKey, token]);

  return (
    <div className="tracklist-search-page">
      <div className="tracklist-table_title">
        <div className="title-number">#</div>
        <div className="title-info">title</div>
        <div className="title-album">album</div>
        <div className="title-time track-time_right">
          <IconClock fill="#b3b3b3" />
        </div>
      </div>
      <div className="line"></div>
      {tracks?.map((item, index) => (
        <TracklistRow
          key={`${item.name}${Math.random()}`}
          number={index + 1}
          image={item.album.images[0].url}
          name={item.name}
          trackID={item.id}
          setTrackID={setTrackID}
          artist={item.artists[0].name}
          artistID={item.artists[0].id}
          album={item.album.name}
          albumID={item.album.id}
          setAlbumID={setAlbumID}
          duration={item.duration_ms}
          setRandomColor={setRandomColor}
          isPlaying={(item.id === audio.dataset.track_id) ? true : false}
        />
      ))}
    </div>
  )
}

export default TracksSearchPage;
