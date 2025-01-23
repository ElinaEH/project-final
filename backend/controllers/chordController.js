// chordController.js
const chordProgressions = {
    uplifting: [
      ['I', 'IV', 'V', 'I'],
      ['I', 'V', 'vi', 'IV'], 
      ['I', 'iii', 'IV', 'V'],
      ['I', 'IV', 'vi', 'V']
    ],
    emotional: [
      ['vi', 'IV', 'I', 'V'],
      ['i', 'VI', 'III', 'VII'],
      ['i', 'iv', 'v', 'i'],
      ['vi', 'iii', 'IV', 'V']
    ],
    nostalgic: [
      ['IV', 'I', 'V', 'vi'],
      ['ii', 'V', 'I', 'vi'],
      ['I', 'vi', 'IV', 'V'],
      ['I', 'iii', 'vi', 'IV']
    ]
   };
   
   const keys = {
    'C': ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim'],
    'G': ['G', 'Am', 'Bm', 'C', 'D', 'Em', 'F#dim'],
    'D': ['D', 'Em', 'F#m', 'G', 'A', 'Bm', 'C#dim'],
    'A': ['A', 'Bm', 'C#m', 'D', 'E', 'F#m', 'G#dim']
   };
   
   function getRandomProgression(mood = 'uplifting') {
    const progressions = chordProgressions[mood];
    return progressions[Math.floor(Math.random() * progressions.length)];
   }
   
   function translateToKey(progression, key = 'C') {
    const romanNumerals = {
      'I': 0, 'ii': 1, 'iii': 2, 'IV': 3, 'V': 4, 'vi': 5, 'viidim': 6,
      'i': 0, 'III': 2, 'iv': 3, 'v': 4, 'VI': 5, 'VII': 6
    };
    
    return progression.map(numeral => {
      const index = romanNumerals[numeral];
      return keys[key][index];
    });
   }
   
   export const getChordProgression = (req, res) => {
    try {
      const { key = 'C' } = req.query;
      const moods = Object.keys(chordProgressions);
      const randomMood = moods[Math.floor(Math.random() * moods.length)];
      const progression = getRandomProgression(randomMood);
      const chords = translateToKey(progression, key);
      
      res.json({
        mood: randomMood,
        key,
        progression,
        chords,
        success: true
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        error: error.message 
      });
    }
   };
   
   export const getMoodProgression = (req, res) => {
    try {
      const { mood } = req.query;
      
      if (!mood || !chordProgressions[mood]) {
        return res.status(400).json({
          success: false,
          message: "Please provide a valid mood (uplifting, emotional, or nostalgic)"
        });
      }
   
      const progression = getRandomProgression(mood);
      const chords = translateToKey(progression, 'C');
      
      res.json({
        mood,
        progression,
        chords,
        success: true
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        error: error.message 
      });
    }
   };
   