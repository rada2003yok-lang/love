/**
 * Romantic Audio Engine:
 * - Plays soothing music box / retro lo-fi melodies via Web Audio API (100% reliable, no CORS or dead links)
 * - Supports custom user audio file upload or direct audio streams
 */

export interface TrackOption {
  id: string;
  name: string;
  nameEn: string;
  genre: string;
  tempo: number;
}

export const PRESET_TRACKS: TrackOption[] = [
  {
    id: 'melody-musicbox',
    name: 'กล่องดนตรีแห่งรัก (Music Box of Love)',
    nameEn: "Sweet Music Box",
    genre: 'Romantic Music Box',
    tempo: 100,
  },
  {
    id: 'melody-lofi',
    name: 'คาเฟ่ฝันหวาน (Y2K Dreamy Lo-Fi)',
    nameEn: "Dreamy Lo-Fi Chimes",
    genre: 'Cozy Lo-Fi',
    tempo: 84,
  },
  {
    id: 'melody-canthlep',
    name: 'ตกหลุมรักซ้ำๆ (Falling For You)',
    nameEn: "Falling In Love Ballad",
    genre: 'Soft Piano Chords',
    tempo: 92,
  },
  {
    id: 'melody-starlight',
    name: 'ระเบียงดวงดาว (Starlight Lullaby)',
    nameEn: "Aesthetic Starlight",
    genre: 'Kalimba & Bells',
    tempo: 108,
  },
];

// Frequencies for notes
const NOTE_FREQ: Record<string, number> = {
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00, B5: 987.77,
  C6: 1046.50
};

type NotePattern = Array<[string, number]>; // [note, duration in beats]

const MELODIES: Record<string, NotePattern> = {
  'melody-musicbox': [
    ['C5', 1], ['E5', 1], ['G5', 1], ['C6', 2],
    ['B5', 1], ['G5', 1], ['A5', 2],
    ['F5', 1], ['A5', 1], ['C6', 1], ['B5', 2],
    ['G5', 1], ['E5', 1], ['G5', 2],
    ['A5', 1], ['F5', 1], ['E5', 1], ['D5', 2],
    ['C5', 1], ['E5', 1], ['D5', 2],
    ['C5', 4]
  ],
  'melody-lofi': [
    ['E4', 1.5], ['G4', 1.5], ['B4', 1], ['D5', 2],
    ['C5', 1.5], ['E5', 1.5], ['G5', 1], ['F5', 2],
    ['D4', 1.5], ['F4', 1.5], ['A4', 1], ['C5', 2],
    ['B4', 1.5], ['D5', 1.5], ['F5', 1], ['E5', 2]
  ],
  'melody-canthlep': [
    ['C5', 1.5], ['G4', 0.5], ['C5', 1], ['D5', 1],
    ['E5', 2], ['D5', 1], ['C5', 1],
    ['A4', 2], ['C5', 1.5], ['D5', 0.5],
    ['E5', 3], ['D5', 1],
    ['C5', 2], ['B4', 1], ['A4', 1],
    ['G4', 3], ['G4', 1],
    ['A4', 1], ['C5', 1], ['E5', 1], ['D5', 1],
    ['C5', 4]
  ],
  'melody-starlight': [
    ['G5', 0.75], ['E5', 0.75], ['C5', 0.75], ['G4', 1.75],
    ['A4', 0.75], ['C5', 0.75], ['E5', 0.75], ['D5', 1.75],
    ['G5', 0.75], ['A5', 0.75], ['G5', 0.75], ['E5', 1.75],
    ['C5', 0.75], ['D5', 0.75], ['E5', 0.75], ['C5', 2.5]
  ]
};

class RomanticAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private currentTrack = 'melody-musicbox';
  private timerId: number | null = null;
  private currentNoteIndex = 0;
  private volume = 0.6;
  private masterGain: GainNode | null = null;
  private customAudioEl: HTMLAudioElement | null = null;
  private listeners: Array<(isPlaying: boolean, currentBeat: number) => void> = [];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(fn: (isPlaying: boolean, currentBeat: number) => void) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }

  private notify(beat: number) {
    this.listeners.forEach(fn => fn(this.isPlaying, beat));
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
    if (this.customAudioEl) {
      this.customAudioEl.volume = this.volume;
    }
  }

  public getVolume() {
    return this.volume;
  }

  private playTone(freq: number, durationSec: number) {
    if (!this.ctx || !this.masterGain) return;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    // Sweet music-box / bell tone with soft sine + gentle triangle harmonic
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, this.ctx.currentTime);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2.01, this.ctx.currentTime); // subtle shimmery chime overtone

    const now = this.ctx.currentTime;
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.35, now + 0.02);
    // Exponential decay like a music box tine
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + Math.max(0.4, durationSec * 1.5));

    osc1.connect(noteGain);
    osc2.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + durationSec * 1.6);
    osc2.stop(now + durationSec * 1.6);
  }

  public play(trackId?: string, customAudioUrl?: string) {
    this.initContext();

    if (customAudioUrl) {
      this.stop();
      if (!this.customAudioEl) {
        this.customAudioEl = new Audio();
        this.customAudioEl.loop = true;
      }
      this.customAudioEl.src = customAudioUrl;
      this.customAudioEl.volume = this.volume;
      this.customAudioEl.play().catch(e => console.warn('Audio play error:', e));
      this.isPlaying = true;
      this.notify(0);
      return;
    }

    if (trackId) {
      this.currentTrack = trackId;
    }

    if (this.isPlaying) return;
    this.isPlaying = true;
    this.currentNoteIndex = 0;
    this.scheduleNextNote();
    this.notify(0);
  }

  private scheduleNextNote() {
    if (!this.isPlaying) return;

    const melody = MELODIES[this.currentTrack] || MELODIES['melody-musicbox'];
    const trackInfo = PRESET_TRACKS.find(t => t.id === this.currentTrack) || PRESET_TRACKS[0];
    const beatDuration = 60 / trackInfo.tempo;

    const [note, beats] = melody[this.currentNoteIndex];
    const durationSec = beats * beatDuration;

    if (NOTE_FREQ[note]) {
      this.playTone(NOTE_FREQ[note], durationSec);
    }

    this.notify(this.currentNoteIndex);

    this.timerId = window.setTimeout(() => {
      this.currentNoteIndex = (this.currentNoteIndex + 1) % melody.length;
      this.scheduleNextNote();
    }, durationSec * 1000);
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.customAudioEl) {
      this.customAudioEl.pause();
    }
    this.notify(0);
  }

  public toggle(trackId?: string, customAudioUrl?: string) {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.play(trackId, customAudioUrl);
    }
  }

  public getIsPlaying() {
    return this.isPlaying;
  }
}

export const romanticAudio = new RomanticAudioSynthesizer();
