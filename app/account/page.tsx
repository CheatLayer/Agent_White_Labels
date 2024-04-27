import CustomerPortalForm from '@/components/ui/AccountForms/CustomerPortalForm';
import EmailForm from '@/components/ui/AccountForms/EmailForm';
import NameForm from '@/components/ui/AccountForms/NameForm';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Account() {
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

  return (
    <section className="mb-32 bg-black">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-24 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            Account
          </h1>
         {subscription && (
        <div className="w-full max-w-3xl m-auto my-8 border rounded-md p border-zinc-700" >
          {/* Replace "Extra Content Here" with whatever special content you want to show */}
          <h2>Special Access Content</h2>
         
    <div class="container mx-auto">
        <h3 class="text-2xl font-semibold text-center mb-6">About Us</h3>
        <form id="ajaxForm" class="mt-6">
            <div class="mb-4">
                <label for="key" class="block text-gray-700">Key:</label>
                <input type="text" id="key" name="key" class="w-full px-3 py-2 border rounded-md" required="">
            </div>
            <div class="mb-4">
                <label for="prompt" class="block text-gray-700">Prompt:</label>
                <input type="text" id="prompt" name="prompt" class="w-full px-3 py-2 border rounded-md" required="">
            </div>
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md">Submit</button>
        </form>
    </div>

<script>
    document.getElementById('ajaxForm').addEventListener('submit', function(e) {
        e.preventDefault();
        var key = document.getElementById('key').value;
        var prompt = document.getElementById('prompt').value;
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
    });
</script>
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
