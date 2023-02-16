import React, { useEffect, useState } from "react";
import { getPlaylists } from "../api/getPlaylist";
import { IPlaylist } from "../components/interfaces/apiInterfaces";
import extractColors from "extract-colors";
import { IconHeart, IconPlayCard, IconClock, IconPreloader } from "../icons";
import TracklistRow from "../components/TracklistRow";
import { getUserPlaylist } from "../api/getUserPlaylist";
import { getUserId } from "../api/getUserId";
import { checkSavedTracks } from "../api/checkSavedTracks";

interface IPlaylistPage {
  playlistID: string;
  randomColor: string;
  setPlaylistName: React.Dispatch<React.SetStateAction<string>>;
}

function PlaylistPage({
  playlistID,
  randomColor,
  setPlaylistName,
}: IPlaylistPage) {
  const token = window.localStorage.getItem("token");
  const [playlist, setPlaylists] = useState<IPlaylist | null>(null);
  const [list, setList] = useState<[]>([])
  const [strId, setStrId] = useState('')
  const [listIds, setListIds] = useState([]);


  useEffect(() => {
    if (playlistID.length > 0) {
      const foo = async () => {
        setPlaylists(await getPlaylists(token, playlistID));
      };
      foo();
    }
  }, [setPlaylists]);

  useEffect(() => {
    setPlaylistName(playlist ? playlist.name : "");

    if(playlist !== null) {
      setStrId(getTracksIds())
    }
  }, [playlist]);

  // extractColors(
  //   document.querySelector(".playlist-header_cover") as HTMLImageElement
  // )
  //   .then(console.log)
  //   .catch(console.error);

  useEffect(() => {
    async function getListOfSavedPlaylists() {
      let id = await getUserId(token)
      setList(await getUserPlaylist(token, id))
    }
    getListOfSavedPlaylists()
  }, [])

  const getFollowers = (followers: string) => {
    const reverse = followers.split("").reverse().join("");
    let str = "";
    for (let i = 0; i < followers.length; i++) {
      if (i % 3 === 0) {
        str += `,${reverse[i]}`;
      } else {
        str += reverse[i];
      }
    }

    if (str[0] === ",") {
      return str.slice(1).split("").reverse().join("");
    } else {
      return str.split("").reverse().join("");
    }
  };

  const followers =
    String(playlist?.followers.total).length > 3
      ? getFollowers(String(playlist?.followers.total))
      : playlist?.followers.total;

  function getTracksIds() {
      let ids = ''
      let index = 0

      playlist?.tracks.items.forEach((item) => {
        if(index === 50) {
          return ids
        }
        ids += item.track.id + ','
        index++
      })
      return ids
    }

  useEffect(() => {
    if(strId) {
      const checkTrack = async () => {
        let result = await checkSavedTracks(token, strId)
        setListIds(result)
      }
      checkTrack()
    }
  }, [strId])

  return playlist ? (
    <div className="playlist-page">
      <div
        className="playlist-header"
        style={{
          backgroundColor: randomColor,
        }}
      >
        <img
          src={`${playlist?.images[0].url}`}
          alt="cover"
          className="playlist-header_cover"
          crossOrigin="anonymous"
        />
        <div className="playlist-header_item">
          <h2 className="playlist_title">playlist</h2>
          <h1 className="playlist_name">{`${
            playlist ? playlist.name : ""
          }`}</h1>
          <p className="playlist_dscr">{`${
            playlist ? playlist.description : ""
          }`}</p>
          <div className="playlist_info">
            <span className="playlist_owner">{`${
              playlist ? playlist.owner.display_name : ""
            }`}</span>
            <span className="playlist_followers">{`${
              playlist ? followers : 0
            } likes`}</span>
            <span className="playlist_tracks">{`${
              playlist ? playlist.tracks.total : 0
            } songs`}</span>
          </div>
        </div>
      </div>

      <div className="tracklist-table">
        <div
          className="tracklist-gradient"
          style={{
            background: `linear-gradient(0deg, #22222260 0, ${randomColor} 500%)`,
          }}
        ></div>
        <div className="control-panel">
          <div className="play-btn">
            <IconPlayCard height={28} width={28} />
          </div>
          <IconHeart height={32} width={32} className={"like-btn"}/>
        </div>
        <div className="tracklist-table_title">
          <div className="title-number">#</div>
          <div className="title-info">title</div>
          <div className="title-album">album</div>
          <div className="title-date">date added</div>
          <div className="title-time">
            <IconClock fill="#b3b3b3" />
          </div>
        </div>
        <div className="line"></div>
        {playlist?.tracks.items.map((item, index) => (
          <TracklistRow
            key={`${item.track.name}${Math.random()}`}
            number={index + 1}
            image={item.track.album.images[0].url}
            name={item.track.name}
            artist={item.track.artists[0].name}
            album={item.track.album.name}
            data={item.added_at}
            duration={item.track.duration_ms}
            id={item.track.id}
            uri={item.track.uri}
            list={list}
            playlistId={playlist.id}
            addedTrack={listIds[playlist?.tracks.items.indexOf(item)]}
            setPlaylists={setPlaylists}
          />
        ))}
      </div>
    </div>
  ) : (
    <div className="preloader">
      <IconPreloader width={50} height={50} />
    </div>
  );
}

export default PlaylistPage;
