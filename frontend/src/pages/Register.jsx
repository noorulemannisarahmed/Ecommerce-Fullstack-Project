import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const { register, loading } = useAuth();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      return setError('Passwords do not match');
    }
    if (form.password.length < 6) {
      return setError('Password must be at least 6 characters long');
    }

    const result = await register(form.name, form.email, form.password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8" style={{ background: "#FAFAF8" }}>
      <div className="bg-white rounded-3xl shadow-sm border border-stone-200 p-8 w-full max-w-md">

        {/* Logo */}
        <div className="flex items-center gap-2 justify-center mb-6">
          <div className="p-2 rounded-xl" style={{ background: "#F59E0B" }}>
            <ShoppingBag className="text-white" size={18} />
          </div>
          <span className="font-black text-lg text-stone-900">Amazon</span>
        </div>

        <h2 className="text-2xl font-black text-stone-900 text-center mb-1">Create account</h2>
        <p className="text-sm text-stone-400 text-center mb-6 font-medium">Join us today</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-4 font-medium">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold text-stone-700 mb-1.5 block uppercase tracking-wider">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-amber-400 transition-all bg-stone-50 font-medium text-stone-800"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 mb-1.5 block uppercase tracking-wider">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-amber-400 transition-all bg-stone-50 font-medium text-stone-800"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 mb-1.5 block uppercase tracking-wider">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-amber-400 transition-all bg-stone-50 font-medium text-stone-800"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 mb-1.5 block uppercase tracking-wider">Confirm Password</label>
            <input
              type="password"
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-amber-400 transition-all bg-stone-50 font-medium text-stone-800"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-2.5 text-stone-900 rounded-xl text-sm font-black hover:opacity-90 transition-all disabled:opacity-60 mt-1"
            style={{ background: "#F59E0B" }}
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </div>

        <p className="text-sm text-center text-stone-400 mt-5 font-medium">
          Already have an account?{' '}
          <Link to="/login" className="text-amber-600 font-black hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}