// pages/api/pairMembers.js
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { name } = req.body;

  try {
    const filePath = path.join(process.cwd(), 'public', 'joyfulmembers.csv');
    const members = fs.readFileSync(filePath, 'utf8').split('\n').filter(Boolean);

    if (!members.includes(name)) {
      return res.status(400).json({ error: 'You are Not Eligible' });
    }

    const eligibleMembers = members.filter(member => member !== name);
    const pairedMember = eligibleMembers[Math.floor(Math.random() * eligibleMembers.length)];

    // Store paired combination in joyfulpaired.csv
    const pairedFilePath = path.join(process.cwd(), 'public', 'joyfulpaired.csv');
    const pairedData = `${name},${pairedMember}\n`;

    fs.appendFileSync(pairedFilePath, pairedData);

    return res.status(200).json({ pairedWithName: pairedMember });
  } catch (error) {
    console.error('Error pairing members:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
