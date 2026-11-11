/** Turns design-pixel boxes into percentages of the artboard, so a diagram scales with its container. */
export function artboard(width, height) {
  const pct = (value, total) => `${(value / total) * 100}%`;
  return (x, y, w, h) => ({
    left: pct(x, width),
    top: pct(y, height),
    ...(w != null && { width: pct(w, width) }),
    ...(h != null && { height: pct(h, height) }),
  });
}

/** Font size that follows the artboard width (container query units). */
export const cqw = (px, width, min = 0) => `max(${min}px, ${(px / width) * 100}cqw)`;
