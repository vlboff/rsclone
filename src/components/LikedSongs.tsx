import React from 'react';
import { IconPlayCard } from "../icons";

function LikedSongs() {
  return (
    <a href="#" className='liked-songs-box'>
        <div className='liked-songs-box__tracks'>
        </div>
        <div className='linked-songs-box__bottom'>
          <div className='linked-songs-box__info'>
              <h3 className='liked-songs-box__title'>Liked Songs</h3>
              <div className='liked-songs-box__amount'>5 liked songs</div>
          </div >
          <button className='liked-songs-box__btn btn-reset'>
            <div className="circle">
              <IconPlayCard />
            </div>
          </button>
        </div >
    </a>
  )
}

export default LikedSongs