// pages/members.js
import { useState, useEffect } from 'react';
import csv from 'csv-parser';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getMembers');
        const data = await response.json();
        setMembers(data.members);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddMember = async () => {
    if (newMember) {
      try {
        await fetch('/api/addMember', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ newMember }),
        });

        // Refetch the updated members list
        const response = await fetch('/api/getMembers');
        const data = await response.json();
        setMembers(data.members);

        setNewMember('');
      } catch (error) {
        console.error('Error adding member:', error);
      }
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-4xl font-bold mb-4">Members</h1>
      <ul className="list-disc pl-4">
        {members.map((member, index) => (
          <li key={index} className="text-lg">{member}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Enter a new member"
        className="mt-4 p-2 border border-gray-300"
        value={newMember}
        onChange={(e) => setNewMember(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleAddMember()}
      />
      <button
        onClick={handleAddMember}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Member
      </button>
    </div>
  );
};

export default Members;
