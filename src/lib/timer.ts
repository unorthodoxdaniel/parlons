/** Deadline-based countdown: background throttling never extends a session.
 * Pausing snapshots the remaining duration; resuming sets a new deadline. */
export class Countdown {
  private deadline = 0;
  private held = 0;
  paused = false;
  private now: () => number;
  constructor(now: () => number = Date.now) { this.now = now; }
  start(seconds: number) {
    this.held = Math.max(0, seconds * 1000);
    this.deadline = this.now() + this.held;
    this.paused = false;
  }
  remaining() { return Math.max(0, this.paused ? this.held : this.deadline - this.now()); }
  pause() { this.held = this.remaining(); this.paused = true; }
  resume() { this.deadline = this.now() + this.held; this.paused = false; }
}
export function clockText(milliseconds: number) {
  const seconds = Math.ceil(milliseconds / 1000);
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}
