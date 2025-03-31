'use client';
import Spinner from '@/components/Spinner';
import { useEffect, useState } from 'react';
import Button from '@/components/Button';

interface UserProfile {
  bio?: string;
  age?: number;
  gender?: string;
}

interface User {
  id: string;
  name?: string;
  email?: string;
  profile?: UserProfile;
}

export default function ExplorePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [likedUserIds, setLikedUserIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {
    fetch('/api/users/explore')
    .then(res => res.json())
    .then(data => {
      setUsers(data);
      setLoading(false);
    });
}, []);

  const handleLike = async (toUserId: string) => {
    setIsLoading(true);
    const res = await fetch('/api/like', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ toUserId }),
    });
setIsLoading(false);
    const data = await res.json();
    alert(data.match ? "💘 It's a match!" : 'Liked!');
    setLikedUserIds(ids => [...ids, toUserId]);
  };
  if (loading) return <div className="flex justify-center mt-20"><Spinner /></div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-4">
      <h2 className="text-3xl font-bold text-center">Explore Users</h2>
      {users.length === 0 ? (
        <p className="text-center text-gray-500">No users available to swipe</p>
      ) : (
        users.map(user => (
          <div key={user.id} className="p-4 bg-white shadow rounded-xl">
            <h3 className="text-xl font-semibold">{user.name || 'Unnamed'}</h3>
            <p className="text-sm text-gray-600">{user.email}</p>
            {user.profile && (
              <>
                <p className="mt-2">{user.profile.bio}</p>
                <p className="text-sm text-gray-500">Age: {user.profile.age}</p>
                <p className="text-sm text-gray-500">Gender: {user.profile.gender}</p>
              </>
            )}
            <Button
              disabled={likedUserIds.includes(user.id)}
              onClick={() => handleLike(user.id)}  loading={isLoading} 
              className="mt-4 w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 disabled:opacity-50"
            >
              {likedUserIds.includes(user.id) ? 'Liked' : 'Like'}
            </Button>
          </div>
        ))
      )}
    </div>
  );
}
