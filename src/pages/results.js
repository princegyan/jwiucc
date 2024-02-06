// pages/results.js
import { useState, useEffect } from 'react';

const Results = () => {
  const [pairs, setPairs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getPairs');
        const data = await response.json();
        setPairs(data.pairs);
      } catch (error) {
        console.error('Error fetching paired data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-4xl font-bold mb-4">Results</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Sender</th>
            <th className="py-2 px-4 border-b">Receiver</th>
          </tr>
        </thead>
        <tbody>
          {pairs.map((pair, index) => (
            <tr key={index} className={(index % 2 === 0) ? 'bg-gray-100' : 'bg-white'}>
              <td className="py-2 px-4 border-b">{pair[0]}</td>
              <td className="py-2 px-4 border-b">{pair[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Results;
