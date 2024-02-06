// pages/api/members.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    // Append the new name to the csv file
    const filePath = path.join(process.cwd(), 'joyfulmembers.csv');
    fs.appendFileSync(filePath, `${req.body.name}\n`);

    res.status(200).json({ message: 'Member added successfully.' });
  } else if (req.method === 'GET') {
    // Read the csv file and split it into an array of names
    const filePath = path.join(process.cwd(), 'joyfulmembers.csv');
    const names = fs.readFileSync(filePath, 'utf8').split('\n');

    res.status(200).json(names);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
