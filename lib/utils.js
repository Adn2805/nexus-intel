export const generateId = () => Math.random().toString(36).substring(2, 15);

export const timeAgo = (timestamp) => {
  const seconds = Math.floor((new Date() - timestamp) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
};

export const formatNumber = (n) => new Intl.NumberFormat().format(n);
export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
export const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
export const randomChoice = (array) => array[Math.floor(Math.random() * array.length)];
export const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);
