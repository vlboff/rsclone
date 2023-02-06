import { getTrack } from "../api/getTrack";
import { playPauseTrack } from "./playback";

export function listen() {
  const token = window.localStorage.getItem('token');

  document.addEventListener('click', async (e) => {
    if ((e.target as HTMLElement).closest('.play-pause-song')) {
      const trackId = (e.target as HTMLElement).closest('.search-result-song')?.id; 
      if (trackId) {
        const data = await getTrack(token, trackId);
        console.log(data);
        playPauseTrack(data);
      }
    }
  })
}
