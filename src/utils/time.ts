export function formatTime(gameTime: number): string {
  const minutes = Math.floor(gameTime / 1800);
  const remainingMinutes = minutes % 60;
  const hours = Math.floor(minutes / 60);
  const seconds = Math.floor(gameTime / 30 - minutes * 60);

  let hoursString = hours.toString() + ':';
  let minutesString = remainingMinutes.toString() + ':';
  let secondsString = seconds.toString();

  if (remainingMinutes < 10) {
    minutesString = '0' + minutesString;
  }

  if (seconds < 10) {
    secondsString = '0' + secondsString;
  }

  if (hours < 10) {
    hoursString = '0' + hoursString;
  }

  return hoursString + minutesString + secondsString;
}

export function parseTime(timeString: string): number {
  const parts = timeString.split(':');
  if (parts.length !== 3) {
    return 0;
  }

  const [hours, minutes, seconds] = parts.map(Number);

  if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
    return 0;
  }

  // Convert back to game time units
  // hours * 3600 * 30 + minutes * 60 * 30 + seconds * 30
  // = hours * 108000 + minutes * 1800 + seconds * 30
  return hours * 108000 + minutes * 1800 + seconds * 30;
}
