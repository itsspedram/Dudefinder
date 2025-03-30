'use client';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function ProfilePage() {
  const { data: session } = useSession();
  const [form, setForm] = useState({ bio: '', age: '', gender: '', images: '' });

  const saveProfile = async () => {
    await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        age: parseInt(form.age),
        images: form.images.split(',').map(str => str.trim()),
      }),
    });
    alert('Profile saved!');
  };

  if (!session) return <p className="text-center mt-20">Please log in to edit your profile.</p>;

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <div className="space-y-4">
        <input className="w-full p-2 border rounded" placeholder="Bio" onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} />
        <input className="w-full p-2 border rounded" placeholder="Age" onChange={e => setForm(f => ({ ...f, age: e.target.value }))} />
        <input className="w-full p-2 border rounded" placeholder="Gender" onChange={e => setForm(f => ({ ...f, gender: e.target.value }))} />
        <input className="w-full p-2 border rounded" placeholder="Image URLs (comma-separated)" onChange={e => setForm(f => ({ ...f, images: e.target.value }))} />
        <button onClick={saveProfile} className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600">Save Profile</button>
      </div>
    </div>
  );
}
