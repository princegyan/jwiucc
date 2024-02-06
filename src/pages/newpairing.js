// pages/pairing.js
import { useState, useEffect } from 'react';

const NewPairing = () => {
  const [name, setName] = useState('');
  const [pairedWithName, setPairedWithName] = useState('');
  const [pairingInitiated, setPairingInitiated] = useState(false);

  useEffect(() => {
    // Check local storage to see if pairing has already been initiated
    const isPairingInitiated = localStorage.getItem('pairingInitiated') === 'true';
    setPairingInitiated(isPairingInitiated);
  }, []);

  const handlePairing = async () => {
    try {
      if (pairingInitiated) {
        alert('Pairing has already been initiated for this session.');
        return;
      }

      const response = await fetch('/api/pairMembers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        const data = await response.json();
        setPairedWithName(data.pairedWithName);
        setPairingInitiated(true);
        // Save in local storage to persist across page refreshes
        localStorage.setItem('pairingInitiated', 'true');
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error pairing members:', error);
      alert('An error occurred while pairing members.');
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-4xl font-bold mb-4">Pairing</h1>
      <input
        type="text"
        placeholder="Enter your name"
        className="mt-4 p-2 border border-gray-300"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={handlePairing}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        disabled={pairingInitiated}
      >
        Pair Me
      </button>
      {pairedWithName && (
        <p className="mt-4 text-lg">You have been paired with: {pairedWithName}</p>
      )}
    </div>
  );
};

export default NewPairing;
