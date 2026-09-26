// Legal wants the copyright year to advance to next year in December, ahead
// of January. Evaluated at build time, so the site needs a rebuild/deploy in
// December for the new year to appear.
export function copyrightYear(now = new Date()): number {
  return now.getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear();
}
