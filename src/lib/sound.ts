/** Quiet synthesized cues; no audio downloads or third-party dependencies. */
export class SessionSound {
  private context: AudioContext | null = null;
  private voices = new Set<OscillatorNode>();
  enabled = false;

  async enable(): Promise<boolean> {
    try {
      this.context ??= new AudioContext();
      await this.context.resume();
      this.enabled = this.context.state === 'running';
    } catch { this.enabled = false; }
    return this.enabled;
  }

  disable() {
    this.enabled = false;
    for (const voice of this.voices) {
      try { voice.stop(); } catch { /* Already ended. */ }
    }
    this.voices.clear();
  }

  play(cue: 'preparation' | 'finished' | 'tick' | 'reveal') {
    const context = this.context;
    if (!this.enabled || !context || context.state !== 'running') return;
    try {
      const notes = cue === 'finished' ? [660, 880] : cue === 'tick' ? [420] : cue === 'reveal' ? [880] : [660];
      const duration = cue === 'tick' ? .035 : cue === 'reveal' ? .22 : .35;
      const volume = cue === 'tick' ? .025 : .09;
      notes.forEach((frequency, index) => {
        const start = context.currentTime + index * .23;
        const voice = context.createOscillator();
        const gain = context.createGain();
        voice.type = 'sine';
        voice.frequency.value = frequency;
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(volume, start + .005);
        gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
        voice.connect(gain);
        gain.connect(context.destination);
        this.voices.add(voice);
        voice.onended = () => {
          this.voices.delete(voice);
          voice.disconnect(); gain.disconnect();
        };
        voice.start(start);
        voice.stop(start + duration + .03);
      });
    } catch { /* Audio failure must never interrupt the timer. */ }
  }
}
