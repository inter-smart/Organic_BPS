const SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** "2026-09-18" to "18 Sep 2026" (or "18 September 2026" with long). Plain string maths so server and client always agree. */
export function formatDate(iso, { long = false } = {}) {
  const [y, m, d] = String(iso).split("-").map(Number);
  return `${String(d).padStart(2, "0")} ${(long ? LONG : SHORT)[m - 1]} ${y}`;
}
