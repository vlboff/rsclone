import { getTrack } from "../api/getTrack";
import { IResponseTrack } from "../components/interfaces/apiInterfaces";
import { convertTrackTime } from "./utils";

export let isPlaying = false;
const token = window.localStorage.getItem('token');

export async function playPauseTrack(id: string) {
  const data: IResponseTrack = await getTrack(token, id);
  const audio = document.querySelector('.playback') as HTMLAudioElement;
  audio.dataset.track_id = id;
  audio.src = data.preview_url ? data.preview_url : '';
  togglePlayPauseIcon(id);
  showTrackInfo(data);
  showTrackDuration(audio);
  showTrackCurrentTime(audio);
  handleVolume(audio);

  if (!isPlaying) {
    audio.play();
    showCoverArts(data);
  } else {
    audio.pause();
  }
}

function togglePlayPauseIcon(id: string) {
  const trackButton = document.getElementById(id)?.querySelector('.player-tool-button') as HTMLButtonElement;
  const playIcon = '<svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw"><path d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"></path></svg>';
  const pauseIcon = '<svg role="img" height="16" width="16" aria-hidden="true" class="Svg-sc-ytk21e-0 uPxdw UIBT7E6ZYMcSDl1KL62g" viewBox="0 0 24 24" data-encore-id="icon"><path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"></path></svg>';
  const playingBarIcon = document.querySelector('.playing-bar .play-pause-button') as HTMLButtonElement;
  if (!trackButton) return;
  if (trackButton.innerHTML === playIcon) {
    switchAllTracksIconsToPlay();
    trackButton.innerHTML = pauseIcon;
    playingBarIcon.innerHTML = pauseIcon;
    isPlaying = false;
  } else {
    trackButton.innerHTML = playIcon;
    playingBarIcon.innerHTML = playIcon;
    isPlaying = true;
  }
}

function switchAllTracksIconsToPlay() {
  const playIcon = '<svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw"><path d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"></path></svg>';
  const tracks = Array.from(document.querySelectorAll('.search-result-song'));
  tracks.forEach((track) => {
    const trackButton = track.querySelector('.player-tool-button') as HTMLElement;
    trackButton.innerHTML = playIcon;
  })
}

function showCoverArts(data: IResponseTrack) {
  const coverArt = (document.querySelector('.cover-art') as HTMLElement).querySelector('img') as HTMLImageElement;
  const coverArtExpanded = (document.querySelector('.cover-art_expanded') as HTMLElement).querySelector('img') as HTMLImageElement;
  coverArt.src = data.album.images[0].url;
  coverArtExpanded.src = data.album.images[0].url;
}

function showTrackInfo(data: IResponseTrack) {
  const trackName = <HTMLElement>document.querySelector('.playing-bar .track-name')?.querySelector('a') as HTMLLinkElement;
  const trackAuthor = <HTMLElement>document.querySelector('.playing-bar .track-author')?.querySelector('a') as HTMLLinkElement;
  trackName.innerText = data.name;
  trackAuthor.innerText = data.artists[0].name;
}

function showTrackDuration(audio: HTMLAudioElement) {
  const duration = document.querySelector('.playing-bar .playback-duration') as HTMLElement;
  audio.onloadedmetadata = function () {
    duration.innerText = convertTrackTime(audio.duration * 1000);
  };
}

function showTrackCurrentTime(audio: HTMLAudioElement) {
  const currentTime = document.querySelector('.playing-bar .playback-position') as HTMLElement;
  const timeline = document.querySelector('#timeline__range') as HTMLInputElement;
  audio.onloadedmetadata = function () {
    timeline.max = audio.duration.toString();
    timeline.step = '0.001';
  };
  audio.ontimeupdate = function () {
    currentTime.innerHTML = convertTrackTime(audio.currentTime * 1000);
    timeline.value = audio.currentTime.toString();
    timeline.style.background = `linear-gradient(to right, #fff 0%, #fff ${audio.currentTime * 100 / audio.duration}%, #535353 ${audio.currentTime * 100 / audio.duration}%, #535353 100%)`;
  };
  timeline.addEventListener('input', () => {
    timeline.style.background = `linear-gradient(to right, #fff 0%, #fff ${+timeline.value * 100 / audio.duration}%, #535353 ${+timeline.value * 100 / audio.duration}%, #535353 100%)`;
    audio.currentTime = +timeline.value;
  });
}

function handleVolume(audio: HTMLAudioElement) {
  const volume = document.querySelector('#volume-bar__range-input') as HTMLInputElement;
  volume.addEventListener('input', () => {
    volume.style.background = `linear-gradient(to right, #fff 0%, #fff ${+volume.value * 100}%, #535353 ${+volume.value * 100}%, #535353 100%)`;
    audio.volume = +volume.value;
  })
}

export function handlePlayingBarControls() {
  const audio = document.querySelector('.playback') as HTMLAudioElement;
  togglePlayPauseIcon(audio.dataset['track_id'] ? audio.dataset['track_id'] : '');
  if (!isPlaying) {
    audio.play();
    isPlaying = true;
  } else {
    audio.pause();
    isPlaying = false;
  }
}

