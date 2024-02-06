// pages/members.js
import { useState, useEffect } from 'react';

export default function Members() {
  const [name, setName] = useState('');
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // Fetch the list of members when the component mounts
    fetch('/api/members')
      .then(response => response.json())
      .then(data => setMembers(data));
  }, []);

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Call the API route to add a new member
    fetch('/api/members', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })
      .then(response => response.json())
      .then(data => {
        // Update the list of members
        setMembers(prevMembers => [...prevMembers, name]);
        // Clear the input field
        setName('');
      });
  };

  return (
    <div>
      <h1>Members Page</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={handleInputChange} required />
        <button type="submit">Add Member</button>
      </form>
      <h2>Members:</h2>
      <ul>
        {members.map((member, index) => member && <li key={index}>{member}</li>)}
      </ul>
    </div>
  );
}
