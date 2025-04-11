'use client';

import { useSession } from 'next-auth/react';
import Spinner from '@/components/Spinner';
import { useProfileForm } from '@/lib/hooks/useProfile';

export default function ProfilePage() {
  const { data: session } = useSession();
  const {
    form,
    setForm,
    isEditing,
    loading,
    setIsEditing,
    saveProfile,
    handleChange
  } = useProfileForm();
  const startEditing = () => setIsEditing(true);

  if (!session || loading) return <div className="flex justify-center mt-20"><Spinner /></div>;

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>

      {!isEditing && (
        <div className="space-y-2 text-gray-700">
          <p><strong>Bio:</strong> {form.bio || 'N/A'}</p>
          <p><strong>Age:</strong> {form.age || 'N/A'}</p>
          <p><strong>Gender:</strong> {form.gender || 'N/A'}</p>
          <p><strong>Looking For:</strong> {form.lookingFor || 'N/A'}</p>
          <p><strong>Images:</strong> {form.images || 'N/A'}</p>
          <button
            onClick={startEditing}
            className="mt-4 w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
          >
            Edit Profile
          </button>
        </div>
      )}

      {isEditing && (
        <div className="space-y-4">
          <input
            className="w-full p-2 border rounded"
            placeholder="Bio"
            value={form.bio}
            onChange={handleChange('bio')}
          />
          <input
            className="w-full p-2 border rounded"
            placeholder="Age"
            value={form.age}
            onChange={handleChange('age')}
          />
          <select
            className="w-full p-2 border rounded"
            value={form.gender}
            onChange={e => setForm(f => ({ ...f, gender: e.target.value }))}
          >
            <option value="">Select your gender</option>
            <option value="man">Man</option>
            <option value="woman">Woman</option>
          </select>
          <select
            className="w-full p-2 border rounded"
            value={form.lookingFor}
            onChange={e => setForm(f => ({ ...f, lookingFor: e.target.value }))}
          >
            <option value="">Looking for...</option>
            <option value="man">Men</option>
            <option value="woman">Women</option>
            <option value="both">Both</option>
          </select>
          <input
            className="w-full p-2 border rounded"
            placeholder="Image URLs (comma-separated)"
            value={form.images}
            onChange={e => setForm(f => ({ ...f, images: e.target.value }))}
          />
          <button
            onClick={saveProfile}
            disabled={loading}
            className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Spinner /> : 'Save Profile'}
          </button>
        </div>
      )}
    </div>
  );
}