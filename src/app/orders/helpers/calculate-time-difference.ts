export const calculateTimeDifference = (isoStartDate: string, isoEndDate: string) => {
  const start = new Date(isoStartDate);
  const end = new Date(isoEndDate);
  const diffMs = end.getTime() - start.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return `${diffHours}h ${diffMinutes}m`;
};
