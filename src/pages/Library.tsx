import React, { useState } from 'react'
import LikedSongs from '../components/LikedSongs'
import { useEffect } from 'react';
import { getUserId } from '../api/getUserId';
import { getUserPlaylist } from '../api/getUserPlaylist';
import Mix from '../components/Mix';
import { IPlaylistsItems } from '../components/interfaces/apiInterfaces';

interface ILibraryPage {
  setPlaylistsID: React.Dispatch<React.SetStateAction<string>>;
  setRandomColor: React.Dispatch<React.SetStateAction<string>>;
}

function Library({setPlaylistsID, setRandomColor}: ILibraryPage) {
  const token = window.localStorage.getItem('token');
  const [userId, setUserId] = useState('');
  const [myPlaylists, setMyPlaylists] = useState([]);

  useEffect(() => {
    async function getUser() {
      const id = await getUserId(token)
      setUserId(id)
      setMyPlaylists(await getUserPlaylist(token, id))
    }
    getUser();
  }, [])

  return (
    <div className="library">
        <div className="library__container">
            <h2 className='library__title'>
                Playlists
            </h2>
            <div className="library__playlists">
                <LikedSongs
                  setRandomColor={setRandomColor}
                />
                  {myPlaylists.length > 0 
                  ? myPlaylists.map((playlist: IPlaylistsItems) => (
                    <Mix 
                      key={`${playlist.name}${Math.random()}`}
                      image={playlist.images.length > 0 ? playlist.images[0].url : ''}
                      name={playlist.name}
                      description={playlist.description}
                      id={playlist.id}
                      setPlaylistsID={setPlaylistsID}
                      setRandomColor={setRandomColor}
                    />
                  ))
                  : ''}
            </div>
        </div>
    </div>
  )
}

export default Library