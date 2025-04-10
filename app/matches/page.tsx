'use client';

import { useMatches } from '@/lib/hooks/useMatches';
import Link from 'next/link';
import Spinner from '@/components/Spinner';
import Button from '@/components/Button';


export default function MatchesPage() {
  const { matches, loading } = useMatches();

  if (loading) return <div className="flex justify-center mt-20"><Spinner /></div>;


  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-4">
      <h2 className="text-3xl font-bold text-center">Your Matches</h2>
      {matches.length === 0 ? (
        <p className="text-center text-gray-500">No matches yet</p>
      ) : (
        matches.map(match => (
          <div key={match.id} className="p-4 bg-white shadow rounded-xl">
            <h3 className="text-xl font-semibold">{match.name || 'Unnamed'}</h3>
            <p className="text-sm text-gray-600">{match.email}</p>
            {match.profile && (
              <>
                <p className="mt-2">{match.profile.bio}</p>
                <p className="text-sm text-gray-500">Age: {match.profile.age}</p>
                <p className="text-sm text-gray-500">Gender: {match.profile.gender}</p>
              </>
            )}
            <p className="text-xs text-gray-400 mt-2">Matched at: {new Date(match.matchedAt).toLocaleString()}</p>
            <Link href={`/chat/${match.matchId}`}>
              <Button className="mt-4 w-full">Chat</Button>
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
