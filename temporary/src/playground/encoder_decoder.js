import fs from 'fs';
import path from 'path';

// Define file paths
const mp3FilePath = 'sample.mp3';
const encodedTextFilePath = 'encodedmp3.txt';
const decodedMP3Directory = 'decoded_mp3';
const decodedMP3FilePath = path.join(decodedMP3Directory, 'decoded_mp3_file.mp3');

// Ensure the output directory exists, or create it if it doesn't
if (!fs.existsSync(decodedMP3Directory)) {
  fs.mkdirSync(decodedMP3Directory);
}

// Encode MP3 to text
function encodeMP3ToText(mp3FilePath, textFilePath) {
  const mp3Data = fs.readFileSync(mp3FilePath);
  const encodedText = Buffer.from(mp3Data).toString('base64');
  fs.writeFileSync(textFilePath, encodedText);
  console.log('MP3 encoded as text.');
}

// Decode text back to MP3
function decodeTextToMP3(textFilePath, outputMP3FilePath) {
  const encodedText = fs.readFileSync(textFilePath, 'utf-8');
  const mp3Data = Buffer.from(encodedText, 'base64');
  fs.writeFileSync(outputMP3FilePath, mp3Data);
  console.log('Text decoded to MP3.');
}

// Encode MP3 to text and save as encodedmp3.txt
encodeMP3ToText(mp3FilePath, encodedTextFilePath);

// Decode text back to MP3
decodeTextToMP3(encodedTextFilePath, decodedMP3FilePath);
