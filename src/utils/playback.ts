import { getTrack } from "../api/getTrack";
import { searchedTracks } from "../api/searchItems";
import { IResponseTrack } from "../components/interfaces/apiInterfaces";
import { convertTrackTime } from "./utils";

export let isPlaying = false;
let isMuted = false;
const token = window.localStorage.getItem('token');
let currentVolume = 1;
let trackIndex: number;

setTimeout(handleVolume, 100);

export async function selectAndGetTrack(id: string) {
  const data: IResponseTrack = await getTrack(token, id);
  const audio = document.querySelector('.playback') as HTMLAudioElement;
  const selectedTrack = document.getElementById(id) as HTMLElement;

  document.querySelectorAll('.track').forEach((track) => track.classList.remove('track_selected'));
  selectedTrack.classList.add('track_selected');

  audio.src = data.preview_url;
  audio.dataset.track_id = id;

  showTrackInfo(data);
  showTrackDuration(audio);
  showCoverArts(data);
}

export function playPauseTrack(id: string) {
  const audio = document.querySelector('.playback') as HTMLAudioElement;
  
  togglePlayPauseIcon(id);
  showTrackCurrentTimeAndTimeline(audio);

  if (!isPlaying) {
    setTimeout(() => audio.play(), 200);
    console.log('Is playing');
  } else {
    setTimeout(() => audio.pause(), 200);
  }

  const currentTrackId = searchedTracks.filter((track) => {
    return track.id === id;
  })[0];

  trackIndex = searchedTracks.indexOf(currentTrackId);
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
  const startTime = document.querySelector('.playing-bar .playback-position') as HTMLElement;
  audio.onloadeddata = function () {
    startTime.innerText = '0:00';
    duration.innerText = convertTrackTime(audio.duration * 1000);
  }
}

function showTrackCurrentTimeAndTimeline(audio: HTMLAudioElement) {
  const currentTime = document.querySelector('.playing-bar .playback-position') as HTMLElement;
  const timelineDiv = document.querySelector('.timeline') as HTMLInputElement;
  const timelineInput = document.querySelector('#timeline__range') as HTMLInputElement;
  let backgroundColor = '#fff';
  audio.onloadedmetadata = function () {
    timelineInput.max = audio.duration.toString();
    timelineInput.step = '0.001';
  };
  audio.ontimeupdate = function () {
    currentTime.innerHTML = convertTrackTime(audio.currentTime * 1000);
    timelineInput.value = audio.currentTime.toString();
    timelineInput.style.background = `linear-gradient(to right, ${backgroundColor} 0%, ${backgroundColor} ${audio.currentTime * 100 / audio.duration}%, #535353 ${audio.currentTime * 100 / audio.duration}%, #535353 100%)`;
  };
  timelineInput.addEventListener('input', () => {
    timelineInput.style.background = `linear-gradient(to right, ${backgroundColor} 0%, ${backgroundColor} ${+timelineInput.value * 100 / audio.duration}%, #535353 ${+timelineInput.value * 100 / audio.duration}%, #535353 100%)`;
    audio.currentTime = +timelineInput.value;
  });
  timelineDiv.onmouseover = function () {
    backgroundColor = '#1db954';
    timelineInput.style.background = `linear-gradient(to right, ${backgroundColor} 0%, ${backgroundColor} ${+timelineInput.value * 100 / audio.duration}%, #535353 ${+timelineInput.value * 100 / audio.duration}%, #535353 100%)`;
  };
  timelineDiv.onmouseleave = function () {
    backgroundColor = '#fff';
    timelineInput.style.background = `linear-gradient(to right, ${backgroundColor} 0%, ${backgroundColor} ${+timelineInput.value * 100 / audio.duration}%, #535353 ${+timelineInput.value * 100 / audio.duration}%, #535353 100%)`;
  }
}

function handleVolume() {
  const muteButton = document.querySelector('.volume-bar .player-tool-button') as HTMLButtonElement;
  const volume = document.querySelector('#volume-bar__range-input') as HTMLInputElement;
  const audio = document.querySelector('.playback') as HTMLAudioElement;
  let backgroundColor = '#fff';

  volume.value = '1';
  volume.style.background = '#fff';
  volume.max = '1';
  volume.step = '0.01';

  muteButton.addEventListener('click', () => {
    if (!isMuted) {
      audio.volume = 0;
      volume.value = '0';
      volume.style.background = '#535353';
      changeVolumeIcon(volume.value);
      isMuted = true;
    } else {
      audio.volume = currentVolume;
      changeVolumeIcon(volume.value);
      volume.value = currentVolume.toString();
      volume.style.background = currentVolume ? `linear-gradient(to right, ${backgroundColor} 0%, ${backgroundColor} ${currentVolume * 100}%, #535353 ${currentVolume * 100}%, #535353 100%)` : backgroundColor;
      isMuted = false;
    }
  })

  volume.addEventListener('input', () => {
    volume.style.background = `linear-gradient(to right, ${backgroundColor} 0%, ${backgroundColor} ${+volume.value * 100}%, #535353 ${+volume.value * 100}%, #535353 100%)`;
    audio.volume = +volume.value;
    currentVolume = audio.volume;
    changeVolumeIcon(volume.value);
  })

  volume.onmouseover = function () {
    backgroundColor = '#1db954';
    volume.style.background = `linear-gradient(to right, ${backgroundColor} 0%, ${backgroundColor} ${+volume.value * 100}%, #535353 ${+volume.value * 100}%, #535353 100%)`;
  };

  volume.onmouseleave = function () {
    backgroundColor = '#fff';
    volume.style.background = `linear-gradient(to right, ${backgroundColor} 0%, ${backgroundColor} ${+volume.value * 100}%, #535353 ${+volume.value * 100}%, #535353 100%)`;
  }
}

function changeVolumeIcon(volume: string) {
  const muteButton = document.querySelector('.volume-bar .player-tool-button') as HTMLButtonElement;

  if (+volume === 0) {
    muteButton.innerHTML = '<svg role="presentation" height="16" width="16" aria-hidden="true" aria-label="Без звука" id="volume-icon" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw"><path d="M13.86 5.47a.75.75 0 00-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 008.8 6.53L10.269 8l-1.47 1.47a.75.75 0 101.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 001.06-1.06L12.39 8l1.47-1.47a.75.75 0 000-1.06z"></path><path d="M10.116 1.5A.75.75 0 008.991.85l-6.925 4a3.642 3.642 0 00-1.33 4.967 3.639 3.639 0 001.33 1.332l6.925 4a.75.75 0 001.125-.649v-1.906a4.73 4.73 0 01-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 01-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path></svg>';
  } else if (+volume > 0 && +volume <= 0.3) {
    muteButton.innerHTML = '<svg role="presentation" height="16" width="16" aria-hidden="true" aria-label="Volume low" id="volume-icon" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw"><path d="M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 010 4.88z"></path></svg>';
  } else if (+volume > 0.3 && +volume <= 0.6) {
    muteButton.innerHTML = '<svg role="presentation" height="16" width="16" aria-hidden="true" aria-label="Volume medium" id="volume-icon" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw"><path d="M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 6.087a4.502 4.502 0 000-8.474v1.65a2.999 2.999 0 010 5.175v1.649z"></path></svg>';
  } else {
    muteButton.innerHTML = '<svg role="presentation" height="16" width="16" aria-hidden="true" aria-label="Высокая громкость" id="volume-icon" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw"><path d="M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 010 4.88z"></path><path d="M11.5 13.614a5.752 5.752 0 000-11.228v1.55a4.252 4.252 0 010 8.127v1.55z"></path></svg>';
  }
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

export function nextTrack() {
  ++trackIndex;
    trackIndex = trackIndex > searchedTracks.length - 1 ? 0 : trackIndex;
    if (!isPlaying) {
      playPauseTrack(searchedTracks[trackIndex].id);
    } else {
      isPlaying = false;
      playPauseTrack(searchedTracks[trackIndex].id);
    }
}

export function prevTrack() {
  const audio = document.querySelector('.playback') as HTMLAudioElement;
  if (audio.currentTime > 3) {
    audio.currentTime = 0;
  } else {
    --trackIndex;
    trackIndex = trackIndex < 0 ? 0 : trackIndex;
    if (!isPlaying) {
      playPauseTrack(searchedTracks[trackIndex].id);
    } else {
      isPlaying = false;
      playPauseTrack(searchedTracks[trackIndex].id);
    }
  }
}
