import React, { useState } from 'react';
import { saveToken } from '../util/auth';
import { useNavigate, Link } from 'react-router-dom';
import { apiFetch } from '../api';

export default function Signup(){
  const [form, setForm] = useState({name:'', email:'', phone:'', password:''});
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    try{
      const res = await apiFetch('/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      saveToken(res.token);
      window.location.reload();
      nav('/sell'); // go to sell after signup
    }catch(err){
      alert(err.message || 'Error');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8">
          Create Account
        </h2>
        
        <form onSubmit={submit} className="space-y-6" autoComplete="off">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input 
              name="name"
              placeholder="Enter your name" 
              value={form.name} 
              onChange={e=>setForm({...form, name: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              autoComplete="off"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input 
              type="tel"
              name="phone"
              placeholder="Enter your phone number" 
              value={form.phone} 
              onChange={e=>setForm({...form, phone: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              autoComplete="off"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              type="email"
              name="email"
              placeholder="Enter your email" 
              value={form.email} 
              onChange={e=>setForm({...form, email: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              autoComplete="off"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input 
              type="password"
              name="password"
              placeholder="Create a password" 
              value={form.password} 
              onChange={e=>setForm({...form, password: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              autoComplete="new-password"
              required
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl"
          >
            Sign Up
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
