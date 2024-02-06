// pages/results.js
import { useState, useEffect } from 'react';

export default function Results() {
  const [pairs, setPairs] = useState([]);

  useEffect(() => {
    // Fetch the list of pairs when the component mounts
    fetch('/api/results')
      .then(response => response.json())
      .then(data => setPairs(data));
  }, []);

  return (
    <div>
      <h1>Results Page</h1>
      <h2>Paired Combinations:</h2>
      <table>
        <thead>
          <tr>
            <th>Sender</th>
            <th>Receiver</th>
          </tr>
        </thead>
        <tbody>
          {pairs.map((pair, index) => {
            const [sender, receiver] = pair.split(',');
            return (
              <tr key={index}>
                <td>{sender}</td>
                <td>{receiver}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
