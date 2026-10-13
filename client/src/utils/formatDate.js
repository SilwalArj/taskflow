// "2026-10-12" -> local Date. new Date("2026-10-12") would parse as UTC
// and can show the wrong day in some timezones, so we build it manually.
export function parseLocalDate(dateString) {
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function formatDate(dateString) {
  return parseLocalDate(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}