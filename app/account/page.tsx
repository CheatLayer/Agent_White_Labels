import React, { useState } from 'react';
import CustomerPortalForm from '@/components/ui/AccountForms/CustomerPortalForm';
import EmailForm from '@/components/ui/AccountForms/EmailForm';
import NameForm from '@/components/ui/AccountForms/NameForm';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Account() {
  const [key, setKey] = useState('');
  const [prompt, setPrompt] = useState('');
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data: userDetails } = await supabase
    .from('users')
    .select('*')
    .single();

  const { data: subscription, error } = await supabase
    .from('subscriptions')
    .select('*, prices(*, products(*))')
    .in('status', ['trialing', 'active'])
    .maybeSingle();

  if (error) {
    console.log(error);
  }

  if (!user) {
    return redirect('/signin');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'https://cheatlayer.com/triggers/extension', true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({
        "start": "desktop",
        "name": "form",
        "data": "test",
        "key": key,
        "user": "rohan@cheatlayer.com",
        "prompt": prompt,
        "script": "script=form.cheat"
    }));

    console.log('Request sent!'); // Or handle a more sophisticated user feedback
  }

  return (
    <section className="mb-32 bg-black">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-24 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            Account
          </h1>
          {subscription && (
            <div className="w-full max-w-3xl m-auto my-8 border rounded-md p border-zinc-700">
              <h2>Special Access Content</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="Enter key"
                  className="input-text"
                />
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter prompt"
                  className="input-text"
                />
                <button type="submit" className="submit-button">Submit Request</button>
              </form>
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        <CustomerPortalForm subscription={subscription} />
        <NameForm userName={userDetails?.full_name ?? ''} />
        <EmailForm userEmail={user.email} />
      </div>
    </section>
  );
}
