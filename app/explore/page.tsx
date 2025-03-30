'use client';
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    fetch('/api/users/explore')
      .then(res => res.json())
      .then(setUsers);
  }, []);

  const handleLike = async (toUserId: string) => {
    const res = await fetch('/api/like', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ toUserId }),
    });

    const data = await res.json();
    alert(data.match ? "💘 It's a match!" : 'Liked!');
    setLikedUserIds(ids => [...ids, toUserId]);
  };

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
            <button
              disabled={likedUserIds.includes(user.id)}
              onClick={() => handleLike(user.id)}
              className="mt-4 w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 disabled:opacity-50"
            >
              {likedUserIds.includes(user.id) ? 'Liked' : 'Like'}
            </button>
          </div>
        ))
      )}
    </div>
  );
}
