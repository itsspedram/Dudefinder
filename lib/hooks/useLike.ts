import { useState } from "react";

export function useLike() {
    const [isLoading, setIsLoading] = useState(false);
  
    const likeUser = async (toUserId: string) => {
      setIsLoading(true);
      const res = await fetch('/api/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toUserId }),
      });
      setIsLoading(false);
      const data = await res.json();
      return data;
    };
  
    return { likeUser, isLoading };
  }
  