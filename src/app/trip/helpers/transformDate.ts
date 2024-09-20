export default function transformDate(dateStr: string, isShort = false): string {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    month: isShort ? 'short' : 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC'
  };
  return date.toLocaleDateString('en-US', options);
}
