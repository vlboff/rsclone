import { IResponseTrack } from "../components/interfaces/apiInterfaces";

export let isPlaying = false;

export function playPauseTrack(data: IResponseTrack) {
  const audio = document.querySelector('.playback') as HTMLAudioElement;
  audio.src = data.preview_url ? data.preview_url : '';
  if (!isPlaying) {
    audio.play();
    isPlaying = true;
  } else {
    audio.pause();
  }
}
