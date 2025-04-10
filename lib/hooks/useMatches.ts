import { useEffect, useState } from 'react';

interface MatchUser {
  id: string;
  name?: string;
  email?: string;
  matchedAt: string;
  matchId: string;
  profile?: {
    bio?: string;
    age?: number;
    gender?: string;
  };
}
export function useMatches() {
    const [matches, setMatches] = useState<MatchUser[]>([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/matches')
      .then(res => res.json())
      .then(data => {
        setMatches(data);
        setLoading(false);
      });
  }, []);

  return { matches, loading };
}