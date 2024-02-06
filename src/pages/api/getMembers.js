// pages/api/getMembers.js
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), 'public', 'joyfulmembers.csv');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const members = fileContent.split('\n').filter(Boolean);
  res.status(200).json({ members });
}
