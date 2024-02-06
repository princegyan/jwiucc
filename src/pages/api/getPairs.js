// pages/api/getPairs.js
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), 'public', 'joyfulpaired.csv');
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const pairs = fileContent
      .split('\n')
      .filter(Boolean)
      .map((line) => line.split(','));

    res.status(200).json({ pairs });
  } catch (error) {
    res.status(500).json({ error: 'Error reading paired data from file.' });
  }
}
