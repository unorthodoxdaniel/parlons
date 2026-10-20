/** Quiet synthesized cues; no audio downloads or third-party dependencies. */
export class SessionSound {
  private context: AudioContext | null = null;
  private voices = new Set<AudioScheduledSourceNode>();
  private clickBuffer: AudioBuffer | null = null;
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

  play(cue: 'preparation' | 'finished' | 'tick' | 'reveal', progress = 0) {
    const context = this.context;
    if (!this.enabled || !context || context.state !== 'running') return;
    try {
      if (cue === 'tick') {
        // A brief noise transient and a falling wooden tap stay distinct even
        // at the reel's fastest cadence, unlike overlapping sine-wave beeps.
        this.clickBuffer ??= context.createBuffer(1, Math.ceil(context.sampleRate * .012), context.sampleRate);
        const data = this.clickBuffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
        const start = context.currentTime;
        const weight = Math.min(1, Math.max(0, progress));
        const noise = context.createBufferSource();
        noise.buffer = this.clickBuffer;
        const filter = context.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 2400 - 800 * weight;
        filter.Q.value = .8;
        const voice = context.createOscillator();
        voice.type = 'triangle';
        const pitch = (900 - 280 * weight) * (.96 + Math.random() * .08);
        voice.frequency.setValueAtTime(pitch, start);
        voice.frequency.exponentialRampToValueAtTime(pitch * .45, start + .012);
        const gain = context.createGain();
        gain.gain.setValueAtTime(.0001, start);
        gain.gain.linearRampToValueAtTime(.035 + .025 * weight, start + .001);
        gain.gain.exponentialRampToValueAtTime(.0001, start + .012);
        noise.connect(filter);
        filter.connect(gain);
        voice.connect(gain);
        gain.connect(context.destination);
        for (const source of [noise, voice]) {
          this.voices.add(source);
          source.onended = () => {
            this.voices.delete(source);
            source.disconnect();
            if (!this.voices.has(noise) && !this.voices.has(voice)) {
              filter.disconnect(); gain.disconnect();
            }
          };
          source.start(start);
          source.stop(start + .014);
        }
        return;
      }
      const notes = cue === 'finished' ? [660, 880] : cue === 'reveal' ? [520, 780] : [660];
      const duration = cue === 'reveal' ? .16 : .35;
      const volume = cue === 'reveal' ? .045 : .09;
      notes.forEach((frequency, index) => {
        const start = context.currentTime + index * (cue === 'reveal' ? .065 : .23);
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
