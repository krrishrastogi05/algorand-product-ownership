// OwnershipStatus.js
import React, { useState } from 'react';
import axios from './utils/api';

const OwnershipStatus = () => {
  const [productId, setProductId] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/status/${productId}`);
      setStatus(res.data);
    } catch (err) {
      setStatus({ error: 'Unable to fetch status.' });
    }
  };

  return (
    <div>
      <h2>Check Ownership Status</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          placeholder="Product ID"
          required
        />
        <button type="submit">Check</button>
      </form>
      {status && (
        <div>
          <h3>Ownership Status:</h3>
          <pre>{JSON.stringify(status, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default OwnershipStatus;
