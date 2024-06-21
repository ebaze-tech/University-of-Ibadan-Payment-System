import React, { useState } from 'react';
import axios from 'axios';

const RequestPasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:5000/user/request-password-reset', {email});
      setMessage(response.data.message);
      setError('');
    } catch(err){
      setError(err.response.data.error);
      setMessage('');
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Request Password Reset</h1>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required/>
        <button type='submit'>Request Password Reset</button>
      </form>
    </div>
  );
};

export default RequestPasswordReset;