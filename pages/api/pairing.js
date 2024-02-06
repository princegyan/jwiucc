// pages/api/pairing.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    // Read the csv file and split it into an array of names
    const membersFilePath = path.join(process.cwd(), 'joyfulmembers.csv');
    let members = fs.readFileSync(membersFilePath, 'utf8').split('\n');

    // Check if the name is in the list of members
    if (!members.includes(req.body.name)) {
      res.status(400).json({ message: 'You are Not Eligible Contact An Executive' });
    } else {
      // Read the csv file and split it into an array of pairs
      const pairsFilePath = path.join(process.cwd(), 'joyfulpaired.csv');
      let pairs = fs.readFileSync(pairsFilePath, 'utf8').split('\n');

      // Check if the name has already been paired
      if (pairs.some(pair => pair.split(',')[0] === req.body.name)) {
        res.status(400).json({ message: 'You have already been paired' });
      } else {
        // Pair the member with another member
        const pair = members.find(member => member !== req.body.name && !pairs.some(pair => pair.split(',')[0] === member || pair.split(',')[1] === member));

        // Check if a pair was found
        if (pair) {
          // Append the pair to the joyfulpaired.csv file
          fs.appendFileSync(pairsFilePath, `${req.body.name},${pair}\n`);
          res.status(200).json({ message: `Name has been paired with ${pair}` });
        } else {
          res.status(400).json({ message: 'No available members to pair with Contact An Executive' });
        }
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
