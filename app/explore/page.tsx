'use client';

import Spinner from '@/components/Spinner';
import Button from '@/components/Button';
import { useExploreUsers } from '@/lib/hooks/useExplore';

export default function ExplorePage() {
  const { users, likedUserIds, loading, isLiking, likeUser } = useExploreUsers();

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
              onClick={() => likeUser(user.id)}
              loading={isLiking}
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
