export function toIsoString(date: Date | string): string {
  return typeof date === "string" ? new Date(date).toISOString() : date.toISOString();
}
