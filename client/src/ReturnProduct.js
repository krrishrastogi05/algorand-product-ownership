// ReturnProduct.js
import React, { useState } from 'react';
import axios from '../utils/api';

const ReturnProduct = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     productId: '',
//   });

// formData = {  name: 'Rishi',
//   phone: '9006006048',
//     productId: 'UxUi' };

const formData = [
  {
    name: 'Rishi',
    phone: '9006006048',
    productId: 'UxUi'
  }
];

  const [message, setMessage] = useState('');

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/return', formData);
      setMessage(res.data.message || 'Product returned successfully');
    } catch (err) {
      setMessage('Error: ' + err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div>
      <h2>Return Product</h2>
      <form onSubmit={handleSubmit}>
        {/* <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
        <input name="productId" placeholder="Product ID" onChange={handleChange} required /> */}
        <button type="submit">Return</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default ReturnProduct;
