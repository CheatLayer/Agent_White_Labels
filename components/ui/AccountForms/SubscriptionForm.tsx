'use client';

import Button from '@/components/ui/Button';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { createStripePortal } from '@/utils/stripe/server';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import { Tables } from '@/types_db';
function SubscriptionForm() {
  const [key, setEmail] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {

    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'https://cheatlayer.com/triggers/extension', true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          alert('Successfully submitted!');
          setKey('');
          setPrompt('');
        } else {
          alert('Failed to submit: ' + xhr.statusText);
        }
      }
    };
    xhr.send(JSON.stringify({
      "start": "desktop",
      "name": "form",
      "data": "test",
      "key": {key},
      "user": "rohan@cheatlayer.com",
      "prompt": "dogs",
      "script": "script=form.cheat"
    }));
    } catch (err) {
      alert('Failed to subscribe: ');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email" style={{ color: 'white' }}>Subscribe:</label>
      <input
        type="text"
        id="key"
        value={key}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="Enter your key"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default SubscriptionForm;
