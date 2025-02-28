import { romanNumerals, chordProgressions, keys } from "../data/chordProgressionData.js";

// Chord progression generator

// Function to get random key
export const getRandomKey = () => {
  const availableKeys = Object.keys(keys);
  return availableKeys[Math.floor(Math.random() * availableKeys.length)];
}

// Returns a random chord progression based on a random mood
export const getRandomProgression = (mood = "uplifting") => {
  const progressions = chordProgressions[mood];
  return progressions[Math.floor(Math.random() * progressions.length)];
}

// Converts Roman numerals to actual chord names in specified key
export const translateToKey = (progression, key = "C") => {
  return progression.map(numeral => {
    const index = romanNumerals[numeral];
    return keys[key][index];
  });
}

// Controller for getting a random chord progression in any mood
export const getChordProgression = (req, res) => {
  try {
    const randomMood = Object.keys(chordProgressions)[Math.floor(Math.random() * Object.keys(chordProgressions).length)];
    const progression = getRandomProgression(randomMood);
    const randomKey = getRandomKey();
    const chords = translateToKey(progression, randomKey);

    res.json({
      mood: randomMood,
      key: randomKey,
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

// Controller for getting a chord progression in a specific mood
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
    const randomKey = getRandomKey();
    const chords = translateToKey(progression, randomKey);

    res.json({
      mood,
      key: randomKey,
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
