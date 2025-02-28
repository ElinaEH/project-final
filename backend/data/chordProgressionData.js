// Define chord progressions for different moods using Roman numerals used in music theory
export const romanNumerals = {
  "I": 0, "ii": 1, "iii": 2, "IV": 3, "V": 4, "vi": 5, "viidim": 6,
  "i": 0, "III": 2, "iv": 3, "v": 4, "VI": 5, "VII": 6
};

// I = Tonic, IV = Subdominant, V = Dominant, vi = Relative minor, etc. 
export const chordProgressions = {
  uplifting: [
    ["I", "IV", "V", "I"],    // Classic resolution progression
    ["I", "V", "vi", "IV"],   // Popular modern progression
    ["I", "iii", "IV", "V"],  // Rising tension progression 
    ["I", "IV", "vi", "V"]    // Pop progression with minor
  ],
  emotional: [
    ["vi", "IV", "I", "V"],   // Minor start progression
    ["i", "VI", "III", "VII"], // Natural minor progression
    ["i", "iv", "v", "i"],    // Minor plagal cadence
    ["vi", "iii", "IV", "V"]  // Extended minor progression
  ],
  nostalgic: [
    ["IV", "I", "V", "vi"],   // Delayed resolution
    ["ii", "V", "I", "vi"],   // Jazz-inspired progression
    ["I", "vi", "IV", "V"],   // 50s progression
    ["I", "iii", "vi", "IV"]  // Descending progression
  ]
};

// Define actual chords for each key
// Each array represents the diatonic chords built on scale degrees (e.g., C major scale chords)
export const keys = {
  "C": ["C", "Dm", "Em", "F", "G", "Am", "Bdim"],  // C major scale chords
  "G": ["G", "Am", "Bm", "C", "D", "Em", "F#dim"], // G major scale chords
  "D": ["D", "Em", "F#m", "G", "A", "Bm", "C#dim"], // D major scale chords
  "A": ["A", "Bm", "C#m", "D", "E", "F#m", "G#dim"] // A major scale chords
};
