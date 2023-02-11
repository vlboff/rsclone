import React from 'react'
import LikedSongs from '../components/LikedSongs'

function Library() {
  return (
    <div className="library">
        <div className="library__container">
            <h2 className='library__title'>
                Playlists
            </h2>
            <div className="library__playlists">
                <LikedSongs/>
            </div>
        </div>
    </div>
  )
}

export default Library