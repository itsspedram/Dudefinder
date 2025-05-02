"use client";

import { useState } from "react";
import Image from "next/image";
import Spinner from "@/components/Spinner";
import { useExploreUsers } from "@/lib/hooks/useExplore";
import TinderCard from "react-tinder-card";

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
    <div className="max-w-sm sm:max-w-md md:max-w-lg mx-auto mt-10 space-y-4 px-4">
      <h2 className="text-3xl font-bold text-center text-pink-600">💘 Explore Users</h2>

      <div className="relative h-[520px]">
        {nextUser && (
          <div className="absolute inset-0 p-4 scale-[0.94] translate-y-4 z-0">
            <div className="w-full h-full bg-gray-100 border-4 border-gray-200 rounded-xl shadow-inner flex flex-col items-center justify-between">
              <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-md">
                <Image
                  src={
                    nextUser.profile?.images?.[0] ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      nextUser.name || "User"
                    )}&background=random`
                  }
                  alt="Next Profile"
                  fill
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full text-center mt-4 space-y-1 px-4 pb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  {nextUser.name || "Unnamed"}
                </h3>
                <p className="text-sm text-gray-600">{nextUser.email}</p>
                {nextUser.profile && (
                  <div className="flex justify-center gap-2 flex-wrap text-sm text-gray-700">
                    <span className="bg-pink-100 px-3 py-1 rounded-full">
                      Age: {nextUser.profile.age}
                    </span>
                    <span className="bg-purple-100 px-3 py-1 rounded-full">
                      {nextUser.profile.gender}
                    </span>
                  </div>
                )}
                <p className="text-gray-600 mt-2 italic">
                  {nextUser.profile?.bio}
                </p>
              </div>
            </div>
          </div>
        )}

        <TinderCard
          key={currentUser.id}
          onSwipe={(dir) => swiped(dir, currentUser.id)}
          preventSwipe={["up", "down"]}
          className="absolute w-full h-full z-10"
        >
          <div className="relative w-full h-full p-4 bg-white border-4 border-pink-100 rounded-xl shadow-xl flex flex-col items-center justify-between">
            <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-md">
              <Image
                src={
                  currentUser.profile?.images?.[0] ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    currentUser.name || "User"
                  )}&background=random`
                }
                alt="Profile"
                fill
                className="w-full h-full object-cover"
              />

              {swipeLabel && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                  <span className="text-white text-3xl font-bold animate-bounce">
                    {swipeLabel}
                  </span>
                </div>
              )}
            </div>

            <div className="w-full text-center mt-4 space-y-1">
              <h3 className="text-2xl font-bold text-gray-800">
                {currentUser.name || "Unnamed"}
              </h3>
              <p className="text-sm text-gray-600">{currentUser.email}</p>
              {currentUser.profile && (
                <div className="flex justify-center gap-2 flex-wrap text-sm text-gray-700">
                  <span className="bg-pink-100 px-3 py-1 rounded-full">
                    Age: {currentUser.profile.age}
                  </span>
                  <span className="bg-purple-100 px-3 py-1 rounded-full">
                    {currentUser.profile.gender}
                  </span>
                </div>
              )}
              <p className="text-gray-600 mt-2 italic">
                {currentUser.profile?.bio}
              </p>
            </div>

            {/* Manual buttons */}
            <div className="flex justify-around w-full mt-4">
              <button
                onClick={() => swiped("left", currentUser.id)}
                className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 border hover:bg-gray-200 shadow"
              >
                ❌ Dislike
              </button>
              <button
                onClick={() => swiped("right", currentUser.id)}
                className="px-6 py-2 rounded-full bg-pink-500 text-white border hover:bg-pink-600 shadow"
              >
                💘 Like
              </button>
            </div>
          </div>
        </TinderCard>
      </div>
    </div>
  );
}
