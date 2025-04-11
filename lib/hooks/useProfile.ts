import { useState, useEffect } from 'react';

interface ProfileFormState {
  bio: string;
  age: string;
  gender: string;
  images: string;
  lookingFor: string;
}

export function useProfileForm() {
  const [form, setForm] = useState<ProfileFormState>({
    bio: '',
    age: '',
    gender: '',
    images: '',
    lookingFor: ''
  });
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetch('/api/profile')
      .then(res => res.json())
      .then(data => {
        setForm({
          bio: data.bio || '',
          age: data.age?.toString() || '',
          gender: data.gender || '',
          images: data.images?.join(', ') || '',
          lookingFor: data.lookingFor || ''
        });
      });
  }, []);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
  };

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
    setIsEditing(false);
    alert('Profile saved!');
  };

  return {
    form,
    setForm,
    saveProfile,
    loading,
    isEditing,
    setIsEditing,
    handleChange
  };
}
