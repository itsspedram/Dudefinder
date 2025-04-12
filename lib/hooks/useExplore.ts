import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';


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

export function useExploreUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [likedUserIds, setLikedUserIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    fetch('/api/users/explore')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  const likeUser = async (toUserId: string) => {
    setIsLiking(true);
    const res = await fetch('/api/like', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ toUserId }),
    });
    setIsLiking(false);

    const data = await res.json();
    if (data.match) toast.success("💘 It's a match!"); 
    else toast.success("Liked!");

    setLikedUserIds(ids => [...ids, toUserId]);
  };

  return { users, loading, likeUser, likedUserIds, isLiking };
}
