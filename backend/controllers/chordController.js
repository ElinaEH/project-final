// Chord progression generator

// Define chord progressions for different moods using Roman numerals
// I = Tonic, IV = Subdominant, V = Dominant, vi = Relative minor, etc.
const chordProgressions = {
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
const keys = {
  "C": ["C", "Dm", "Em", "F", "G", "Am", "Bdim"],  // C major scale chords
  "G": ["G", "Am", "Bm", "C", "D", "Em", "F#dim"], // G major scale chords
  "D": ["D", "Em", "F#m", "G", "A", "Bm", "C#dim"], // D major scale chords
  "A": ["A", "Bm", "C#m", "D", "E", "F#m", "G#dim"] // A major scale chords
};

/**
 * Returns a random chord progression from the specified mood category
 * @param {string} mood - The desired mood (uplifting, emotional, or nostalgic)
 * @returns {Array} An array of Roman numerals representing the progression
 */
function getRandomProgression(mood = "uplifting") {
  const progressions = chordProgressions[mood];
  return progressions[Math.floor(Math.random() * progressions.length)];
}

/**
 * Converts Roman numerals to actual chord names in the specified key
 * @param {Array} progression - Array of Roman numerals
 * @param {string} key - The desired key (C, G, D, or A)
 * @returns {Array} Array of actual chord names
 */
function translateToKey(progression, key = "C") {
  // Map Roman numerals to array indices (0-based positions in the scale)
  const romanNumerals = {
    "I": 0, "ii": 1, "iii": 2, "IV": 3, "V": 4, "vi": 5, "viidim": 6,
    "i": 0, "III": 2, "iv": 3, "v": 4, "VI": 5, "VII": 6
  };
  
  return progression.map(numeral => {
    const index = romanNumerals[numeral];
    return keys[key][index];
  });
}

/**
 * Controller for getting a random chord progression in any mood
 * @param {Object} req - Express request object with optional key parameter
 * @param {Object} res - Express response object
 */
export const getChordProgression = (req, res) => {
  try {
    const { key = "C" } = req.query;  // Default to C key if none specified
    const moods = Object.keys(chordProgressions);
    // Pick a random mood from available options
    const randomMood = moods[Math.floor(Math.random() * moods.length)];
    const progression = getRandomProgression(randomMood);
    const chords = translateToKey(progression, key);
    
    res.json({
      mood: randomMood,
      key,
      progression,  // Roman numerals
      chords,       // Actual chord names
      success: true
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

/**
 * Controller for getting a chord progression in a specific mood
 * @param {Object} req - Express request object containing mood parameter
 * @param {Object} res - Express response object
 */
export const getMoodProgression = (req, res) => {
  try {
    const { mood } = req.query;
    
    // Validate that the requested mood exists in our progressions
    if (!mood || !chordProgressions[mood]) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid mood (uplifting, emotional, or nostalgic)"
      });
    }
 
    const progression = getRandomProgression(mood);
    const chords = translateToKey(progression, "C");  // Default to C key
    
    res.json({
      mood,
      progression,  // Roman numerals
      chords,       // Actual chord names
      success: true
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};