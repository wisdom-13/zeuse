export function formatTime(date: Date) {
  const betweenTimeDay = diffTime(date);

  if (betweenTimeDay < 1) {
    return `Today`;
  }

  if (betweenTimeDay <= 2) {
    return `${betweenTimeDay} days ago`;
  }

  return formatDate(date);
}

export function diffTime(date: Date) {
  const today = new Date();
  const timeValue = new Date(date);

  const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
  return Math.floor(betweenTime / 60 / 24);
}

function formatDate(date: Date) {
  const timeValue = new Date(date);
  return `${timeValue.getFullYear()}.${String(timeValue.getMonth() + 1).padStart(2, '0')}.${String(timeValue.getDate()).padStart(2, '0')}`;
}