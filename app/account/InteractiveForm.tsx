import { FormEvent } from 'react';

function InteractiveForm() {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const key = formData.get('key') as string;
    const prompt = formData.get('prompt') as string;

    // Assuming '/api/submitContent' is the API endpoint
    const response = await fetch('/api/submitContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key, prompt }),
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Key:
        <input type="text" name="key" required />
      </label>
      <br />
      <label>
        Prompt:
        <input type="text" name="prompt" required />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default InteractiveForm;
