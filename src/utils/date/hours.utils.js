export const getCurrentTime = () => {
  const currentDate = new Date();

  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let seconds = currentDate.getSeconds();

  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;

  const hours24 = (hours >= 12) ? 'PM' : 'AM';

  hours = (hours === 0) ? 12 : hours;

  return `${hours}:${minutes}:${seconds} ${hours24}`;
};
