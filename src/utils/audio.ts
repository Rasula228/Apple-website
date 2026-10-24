let audioCtx: AudioContext | null = null;
let sirenOscillator: OscillatorNode | null = null;
let sirenGain: GainNode | null = null;
let sirenInterval: number | null = null;

export function playEmergencySiren(onStateChange?: (active: boolean) => void): () => void {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    // Stop previous if running
    stopEmergencySiren();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sawtooth';
    // Frequency starts at 620Hz
    osc.frequency.setValueAtTime(620, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();

    sirenOscillator = osc;
    sirenGain = gain;

    // Alternate frequency between 620Hz and 880Hz (Apple Ultra siren pattern)
    let high = false;
    sirenInterval = window.setInterval(() => {
      if (!audioCtx || !sirenOscillator) return;
      const targetFreq = high ? 620 : 880;
      sirenOscillator.frequency.setTargetAtTime(targetFreq, audioCtx.currentTime, 0.04);
      high = !high;
    }, 450);

    if (onStateChange) onStateChange(true);

    return () => stopEmergencySiren(onStateChange);
  } catch (err) {
    console.warn('AudioContext not allowed or not supported', err);
    return () => {};
  }
}

export function stopEmergencySiren(onStateChange?: (active: boolean) => void): void {
  if (sirenInterval !== null) {
    clearInterval(sirenInterval);
    sirenInterval = null;
  }
  if (sirenOscillator) {
    try {
      sirenOscillator.stop();
      sirenOscillator.disconnect();
    } catch {
      // ignore
    }
    sirenOscillator = null;
  }
  if (sirenGain) {
    try {
      sirenGain.disconnect();
    } catch {
      // ignore
    }
    sirenGain = null;
  }
  if (onStateChange) onStateChange(false);
}

// Gentle haptic/click sound for crown rotation
export function playCrownClickSound(): void {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = audioCtx || new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400, ctx.currentTime);
    gain.gain.setValueAtTime(0.015, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.035);
  } catch {
    // audio interaction prevented
  }
}
