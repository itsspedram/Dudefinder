'use client'

import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();
  return (
    <div className="p-4">
      <h1>Welcome to Dudefinder</h1>
      <p>{session?.user?.email}</p>
    </div>
  );
}
