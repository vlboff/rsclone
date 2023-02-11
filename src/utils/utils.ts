export function convertTrackTime(ms: number) {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ":" + (+seconds < 10 ? '0' : '') + seconds;
}

export function getRandomNumber(min: number, max: number) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
