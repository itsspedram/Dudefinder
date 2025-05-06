"use client";

import { useState } from "react";
import Spinner from "@/components/Spinner";
import { useExploreUsers } from "@/lib/hooks/useExplore";
import TinderCard from "react-tinder-card";
import UserCard from "@/components/UserCard";

export default function ExplorePage() {
  const { users, loading, likeUser } = useExploreUsers();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeLabel, setSwipeLabel] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <Spinner />
      </div>
    );
  }

  const swiped = (direction: string, userId: string) => {
    if (direction === "right") {
      likeUser(userId);
      setSwipeLabel("Liked 💘");
    } else {
      setSwipeLabel("Disliked 💔");
    }
    setTimeout(() => setSwipeLabel(null), 1200);
    setCurrentIndex((prev) => prev + 1);
  };

  const currentUser = users[currentIndex];
  const nextUser = users[currentIndex + 1];

  if (!currentUser)
    return (
      <p className="text-center text-2xl text-gray-500 mt-32">
        No users available to swipe
      </p>
    );

  return (
    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto mt-10 space-y-4 px-4">
      <h2 className="text-3xl font-bold text-center text-pink-600">
        💘 Explore Users
      </h2>

      <div className="relative h-[520px]">
        {nextUser && (
          <div className="absolute inset-0 z-0 scale-[0.94] translate-y-4">
            <UserCard user={nextUser} />
          </div>
        )}

        <TinderCard
          key={currentUser.id}
          onSwipe={(dir) => swiped(dir, currentUser.id)}
          preventSwipe={["up", "down"]}
          className="absolute w-full h-full z-10"
        >
          <UserCard
            user={currentUser}
            swipeLabel={swipeLabel}
            onDislike={() => swiped("left", currentUser.id)}
            onLike={() => swiped("right", currentUser.id)}
          />
        </TinderCard>
      </div>
    </div>
  );
}
