import fs from 'fs';
import path from 'path';

// Define file paths
const mp3FilePath = 'sample.mp3';
const decodedMP3Directory = 'decoded_mp3';
const decodedMP3FilePath = path.join(decodedMP3Directory, 'decoded_mp3_file.mp3');

// Ensure the output directory exists, or create it if it doesn't
if (!fs.existsSync(decodedMP3Directory)) {
  fs.mkdirSync(decodedMP3Directory);
}

// Encode MP3 to text and store it as a string
function encodeMP3ToText(mp3FilePath) {
  const mp3Data = fs.readFileSync(mp3FilePath);
  const encodedText = Buffer.from(mp3Data).toString('base64');
  console.log('MP3 encoded as text.');
  return encodedText; // Return the encoded text
}

// Decode text back to MP3
function decodeTextToMP3(encodedText, outputMP3FilePath) {
  const mp3Data = Buffer.from(encodedText, 'base64');
  fs.writeFileSync(outputMP3FilePath, mp3Data);
  console.log('Text decoded to MP3.');
}

// Encode MP3 to text and save it as a variable
const encodedMP3Text = encodeMP3ToText(mp3FilePath);
console.log(encodedMP3Text)

// Decode text back to MP3
decodeTextToMP3(encodedMP3Text, decodedMP3FilePath);
