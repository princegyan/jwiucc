// pages/api/addMember.js
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { newMember } = req.body;
  const filePath = path.join(process.cwd(), 'public', 'joyfulmembers.csv');

  try {
    fs.appendFileSync(filePath, `${newMember}\n`);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error adding member to file.' });
  }
}
