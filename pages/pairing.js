// pages/pairing.js
import { useState } from 'react';

export default function Pairing() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Call the API route to pair a member
    fetch('/api/pairing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })
      .then(response => response.json())
      .then(data => {
        // Display the response message
        setMessage(data.message);
      });
  };

  return (
    <div>
      <h1>Pairing Page</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={handleInputChange} required />
        <button type="submit">Pair</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
