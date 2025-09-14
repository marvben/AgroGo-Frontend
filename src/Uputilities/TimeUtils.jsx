// utils/timeUtils.js
const getRemainingTime = (expiresAt) => {
  const now = new Date();
  const exp = new Date(expiresAt);
  const timeRemaining = exp.getTime() - now.getTime();

  const minutes = Math.floor(timeRemaining / 60000);
  const seconds = Math.floor((timeRemaining % 60000) / 1000);

  return { minutes, seconds, timeRemaining };
};
export default getRemainingTime;
