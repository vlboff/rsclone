import React, { useEffect, useState } from "react";
import { searchItems } from "../api/searchItems";
import { IResponseTrack } from "../components/interfaces/apiInterfaces";
import TracklistRow from "../components/TracklistRow";
import { IconClock } from "../icons";

function TracksSearchPage({ searchKey }: { searchKey: string }) {

  const token = window.localStorage.getItem("token");
  const [tracks, setTracks] = useState<IResponseTrack[] | null>(null);

  useEffect(() => {
    const foo = async () => {
      const data = await searchItems(searchKey, token);
      setTracks(data.tracks.items);
    };
    foo();
  }, [searchKey]);

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
          artist={item.artists[0].name}
          album={item.album.name}
          duration={item.duration_ms}
        />
      ))}
    </div>
  )
}

export default TracksSearchPage;
