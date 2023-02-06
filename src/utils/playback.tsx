import { getTrack } from "../api/getTrack";
import { IResponseTrack } from "../components/interfaces/apiInterfaces";

export let isPlaying = false;
const token = window.localStorage.getItem('token');

export async function playPauseTrack(id: string) {
  const data: IResponseTrack = await getTrack(token, id);
  console.log(data);
  const audio = document.querySelector('.playback') as HTMLAudioElement;
  audio.src = data.preview_url ? data.preview_url : '';
  
  if (!isPlaying) {
    audio.play();
    isPlaying = true;
  } else {
    audio.pause();
    isPlaying = false;
  }

}
