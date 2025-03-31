'use client';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Spinner from '@/components/Spinner';

export default function ProfilePage() {
  const { data: session } = useSession();
  const [form, setForm] = useState({ bio: '', age: '', gender: '', images: '', lookingFor: '' });
  const [loading, setLoading] = useState(false);

  const saveProfile = async () => {
    setLoading(true);
    await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        age: parseInt(form.age),
        images: form.images.split(',').map(str => str.trim()),
      }),
    });
    setLoading(false);
    alert('Profile saved!');
  };

  if (!session) return <div className="flex justify-center mt-20"><Spinner /></div>;

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <div className="space-y-4">
        <input className="w-full p-2 border rounded" placeholder="Bio" onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} />
        <input className="w-full p-2 border rounded" placeholder="Age" onChange={e => setForm(f => ({ ...f, age: e.target.value }))} />
        <select className="w-full p-2 border rounded" onChange={e => setForm(f => ({ ...f, gender: e.target.value }))}>
          <option value="">Select your gender</option>
          <option value="man">Man</option>
          <option value="woman">Woman</option>
        </select>
        <select className="w-full p-2 border rounded" onChange={e => setForm(f => ({ ...f, lookingFor: e.target.value }))}>
          <option value="">Looking for...</option>
          <option value="man">Men</option>
          <option value="woman">Women</option>
          <option value="both">Both</option>
        </select>
        <input className="w-full p-2 border rounded" placeholder="Image URLs (comma-separated)" onChange={e => setForm(f => ({ ...f, images: e.target.value }))} />
        <button
          onClick={saveProfile}
          disabled={loading}
          className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? <Spinner /> : 'Save Profile'}
        </button>
      </div>
    </div>
  );
}