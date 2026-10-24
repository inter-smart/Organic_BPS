/**
 * Animation.js
 * ---------------------------------------------------------------------------
 * Thin wrapper around GSAP so every module tweens through one place. Reads
 * durations/eases from Config, and collapses everything to instant snaps
 * when the user has requested reduced motion.
 */
import { gsap } from 'gsap';
import { prefersReducedMotion } from './Utils.js';

export class AnimationManager {
  constructor(config) {
    this.config = config;
    this.reducedMotion = prefersReducedMotion();
  }

  /** Duration to actually use for a given named animation.duration key, honoring reduced-motion. */
  duration(key) {
    return this.reducedMotion ? 0.001 : this.config.animation[key];
  }

  ease(key) {
    return this.config.animation[key];
  }

  /** Generic tween helper — every other module should animate through this rather than calling gsap directly. */
  to(target, vars, durationKey, easeKey) {
    return gsap.to(target, {
      ...vars,
      duration: durationKey ? this.duration(durationKey) : vars.duration ?? 0.3,
      ease: easeKey ? this.ease(easeKey) : vars.ease ?? 'power2.out',
    });
  }

  fromTo(target, fromVars, toVars, durationKey, easeKey) {
    return gsap.fromTo(target, fromVars, {
      ...toVars,
      duration: durationKey ? this.duration(durationKey) : toVars.duration ?? 0.3,
      ease: easeKey ? this.ease(easeKey) : toVars.ease ?? 'power2.out',
    });
  }

  /** Infinite yoyo pulse (used for pin glow rings). Returns the tween so callers can kill() it on dispose. */
  pulse(target, vars) {
    if (this.reducedMotion) return null;
    return gsap.to(target, {
      ...vars,
      duration: this.duration('pulseDuration'),
      ease: this.ease('pulseEase'),
      repeat: -1,
    });
  }

  killTweensOf(target) {
    gsap.killTweensOf(target);
  }
}
