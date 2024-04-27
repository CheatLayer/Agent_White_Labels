import React, { useState } from 'react';

function SubscriptionForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://example.com/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      alert('Successfully subscribed!');
      setEmail(''); // Clear input after successful submission
    } catch (err) {
      alert('Failed to subscribe: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email" style={{ color: 'white' }}>Subscribe:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="Enter your email"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default SubscriptionForm;
