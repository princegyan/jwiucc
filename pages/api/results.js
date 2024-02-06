// pages/api/results.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Read the csv file and split it into an array of pairs
    const filePath = path.join(process.cwd(), 'joyfulpaired.csv');
    const pairs = fs.readFileSync(filePath, 'utf8').split('\n');

    res.status(200).json(pairs);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
