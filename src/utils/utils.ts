export function convertTrackTime(ms: number) {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ":" + (+seconds < 10 ? "0" : "") + seconds;
}

export function getRandomNumber(min: number, max: number) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

export function getSeparateByCommas(number: string) {
  const reverse = number.split("").reverse().join("");
  let str = "";
  for (let i = 0; i < number.length; i++) {
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
}
