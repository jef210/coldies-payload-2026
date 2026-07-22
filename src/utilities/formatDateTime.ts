// The Coldies are based in Denver/Boulder - dates are always shown in this
// timezone regardless of where the server (or a visitor) happens to be, so
// a date picked in the admin always displays as the same calendar day.
const EVENT_TIME_ZONE = 'America/Denver'

export const formatDateTime = (timestamp: string): string => {
  const date = timestamp ? new Date(timestamp) : new Date()

  return new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: '2-digit',
    timeZone: EVENT_TIME_ZONE,
    year: 'numeric',
  }).format(date)
}
