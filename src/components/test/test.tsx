'use client';

import { useState } from 'react';

export default function TriggerPostRequest() {
  const [response, setResponse] = useState(null);

  const handleRequest = async () => {
    const url = 'https://dexla-law-e0ada13f5b10.herokuapp.com/registration';
    const payload = {
      firstName: 'username',
      lastName: 'userlastame',
      password: 'Televizor5496',
      email: 'ddo2102@gmail.com',
    };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error: any) {
      setResponse({ error: error.message });
    }
  };

  return (
    <div>
      <button onClick={handleRequest} className='px-4 py-2 bg-blue-500 text-white rounded'>
        Send Post Request
      </button>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
}
