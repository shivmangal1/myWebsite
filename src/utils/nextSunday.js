const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

// Returns the upcoming Sunday (today counts as upcoming if it's already Sunday)
export function getNextSunday(fromDate = new Date()) {
  const date = new Date(fromDate);
  const daysUntilSunday = (7 - date.getDay()) % 7;
  date.setDate(date.getDate() + daysUntilSunday);
  return date;
}

export function formatWebinarDate(date = getNextSunday()) {
  return `Sunday ${date.getDate()} ${MONTH_NAMES[date.getMonth()]} at 10:00 AM`;
}
