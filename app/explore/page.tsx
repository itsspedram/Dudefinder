"use client";

import { useState } from "react";
import Image from "next/image";
import { useSpring, useTransition, to } from "@react-spring/web";
import { useGesture } from "react-use-gesture";
import Spinner from "@/components/Spinner";
import { useExploreUsers } from "@/lib/hooks/useExplore";
import { animated } from "@react-spring/web";

export default function ExplorePage() {
  const { users, loading, likeUser } = useExploreUsers();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeLabel, setSwipeLabel] = useState<string | null>(null);

  const [{ x, rotate, opacity }, api] = useSpring(() => ({
    x: 0,
    rotate: 0,
    opacity: 1,
    config: { tension: 300, friction: 20 },
  }));

  const transition = useTransition(currentIndex + 1 < users.length ? users[currentIndex + 1] : null, {
    from: { opacity: 0, scale: 0.95, y: 12 },
    enter: { opacity: 1, scale: 1, y: 0 },
    leave: { opacity: 0 },
    config: { tension: 200, friction: 25 },
  });

  const triggerSwipe = (direction: "left" | "right") => {
    const currentUser = users[currentIndex];
    if (direction === "right") {
      likeUser(currentUser.id);
      setSwipeLabel("Liked 💘");
    } else {
      setSwipeLabel("Disliked 💔");
    }

    api.start({
      x: direction === "right" ? 1000 : -1000,
      rotate: direction === "right" ? 45 : -45,
      opacity: 0,
      onResolve: () => {
        setSwipeLabel(null);
        api.set({ x: 0, rotate: 0, opacity: 1 });
        setCurrentIndex((prev) => (prev + 1 < users.length ? prev + 1 : prev));
      },
    });
  };

  const bind = useGesture({
    onDrag: ({ down, movement: [mx], velocity, direction: [dx] }) => {
      const angle = mx / 10;
      const triggered = Math.abs(angle) >= 30;
      const dir = dx > 0 ? 1 : -1;

      if (!down && triggered) {
        triggerSwipe(dir === 1 ? "right" : "left");
      } else {
        api.start({ x: down ? mx : 0, rotate: down ? angle : 0, opacity: 1 });
      }
    },
    drag: { axis: 'x', filterTaps: true, threshold: 10 },
  }, {
    target: typeof window !== 'undefined' ? window : undefined,
    eventOptions: { passive: false },
  });

  if (loading)
    return (
      <div className="flex justify-center mt-20">
        <Spinner />
      </div>
    );
  const currentUser = users[currentIndex];
  if (!currentUser) return <p className="text-center text-2xl text-gray-500 mt-32">No users available to swipe</p>;

  return (
    <div className="max-w-sm sm:max-w-md md:max-w-lg mx-auto mt-10 space-y-4 px-4">
      <h2 className="text-3xl font-bold text-center text-pink-600">💘 Explore Users</h2>

      {users.length === 0 ? (
        <p className="text-center text-gray-500">No users available to swipe</p>
      ) : (
        <>
          <div className="relative h-[500px]">
            {transition((style, nextUser) =>
              nextUser ? (
                <animated.div
                  style={style}
                  key={nextUser.id}
                  className="absolute w-full p-4 bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl shadow-md z-0"
                >
                  <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-md mb-4">
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
                </animated.div>
              ) : null
            )}

            <animated.div
              {...bind()}
              key={currentUser.id}
              style={{
                transform: to([x, rotate], (x, r) => `translateX(${x}px) rotate(${r}deg)`),
                opacity,
              }}
              className="absolute w-full p-4 bg-white shadow-xl border-4 border-pink-100 rounded-xl will-change-transform z-10 transition-all touch-none"
            >
              <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-md mb-4">
                <Image
                  key={currentUser.id}
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

              <div className="space-y-2 text-center">
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
                <p className="text-gray-600 mt-2 italic">{currentUser.profile?.bio}</p>
              </div>

              {/* Manual Swipe Controls */}
              <div className="flex justify-around mt-6">
                <button
                  onClick={() => triggerSwipe("left")}
                  className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 border hover:bg-gray-200 shadow"
                >
                  ❌ Dislike
                </button>
                <button
                  onClick={() => triggerSwipe("right")}
                  className="px-6 py-2 rounded-full bg-pink-500 text-white border hover:bg-pink-600 shadow"
                >
                  💘 Like
                </button>
              </div>
            </animated.div>
          </div>
        </>
      )}
    </div>
  );
}
