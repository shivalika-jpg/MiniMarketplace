import React, { useState, useEffect } from 'react';
import { apiFetch } from '../api';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../util/auth';

export default function Sell(){
  const nav = useNavigate();
  const [form, setForm] = useState({ name:'', price:'' , description:''});
  const [image, setImage] = useState(null);

  useEffect(() => {
    if(!isLoggedIn()){
      alert('You are not logged in. Please log in to sell products.');
      nav('/login');
    }
  }, [nav]);

  if(!isLoggedIn()){
    return null;
  }

  async function submit(e){
    e.preventDefault();
    try{
      const fd = new FormData();
      fd.append('name', form.name);
      fd.append('price', form.price);
      fd.append('description', form.description);
      if (image) fd.append('image', image);

      const res = await fetch(`${process.env.REACT_APP_API_BASE || 'http://localhost:5000/api'}/products`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: fd
      });

      const data = await res.json();
      if(!res.ok) throw data;
      alert('Product created');
      nav('/');
    } catch(err){
      alert(err.message || 'Error');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8">
          Sell Your Product
        </h2>
        
        <form onSubmit={submit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
            <input 
              placeholder='Enter product name' 
              value={form.name} 
              onChange={e=>setForm({...form, name: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
            <input 
              type="number"
              placeholder='Enter price' 
              value={form.price} 
              onChange={e=>setForm({...form, price: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea 
              placeholder='Describe your product' 
              value={form.description} 
              onChange={e=>setForm({...form, description: e.target.value})}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={e=>setImage(e.target.files[0])}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 file:cursor-pointer cursor-pointer"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl"
          >
            List Product
          </button>
        </form>
      </div>
    </div>
  );
}
