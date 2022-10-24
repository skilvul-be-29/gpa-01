export function formatTime(dateString) {
  const date = new Date(dateString);
  const diff = new Date() - date;
  const formatter = new Intl.RelativeTimeFormat('en', { style: 'long', numeric: 'auto' });

  if (diff < 1000) {
    return 'Just now';
  }
  if (diff < 60 * 1000) {
    return formatter.format(-Math.floor(diff / 1000), 'second');
  }
  if (diff < 60 * 60 * 1000) {
    return formatter.format(-Math.floor(diff / (60 * 1000)), 'minute');
  }
  if (diff < 24 * 60 * 60 * 1000) {
    return formatter.format(-Math.floor(diff / (60 * 60 * 1000)), 'hour');
  }

  const [weekday, day, year, time] = date
    .toLocaleString('en', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })
    .split(', ');

  date.setHours(0, 0, 0, 0);
  const diffDays = new Date() - date;

  if (diffDays < 2 * 24 * 60 * 60 * 1000) {
    return `Yesterday at ${time}`;
  }
  if (diffDays < 7 * 24 * 60 * 60 * 1000) {
    return `${weekday} at ${time}`;
  }
  if (diffDays < 365 * 24 * 60 * 60 * 1000) {
    return `${day} at ${time}`;
  }
  return `${day}, ${year} at ${time}`;
}
