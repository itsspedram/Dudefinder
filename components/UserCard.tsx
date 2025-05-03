import Image from "next/image";

interface UserCardProps {
  user: {
    id: string;
    name?: string;
    email?: string;
    profile?: {
      bio?: string;
      age?: number;
      gender?: string;
      images?: string[];
    };
  };
  swipeLabel?: string | null;
  onLike?: () => void;
  onDislike?: () => void;
}

export default function UserCard({ user, swipeLabel, onLike, onDislike }: UserCardProps) {
  return (
    <div className="relative w-full h-full p-4 bg-white border-4 border-pink-100 rounded-xl shadow-xl flex flex-col items-center justify-between">
      <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-md">
        <Image
          src={
            user.profile?.images?.[0] ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              user.name || "User"
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
          {user.name || "Unnamed"}
        </h3>
        <p className="text-sm text-gray-600">{user.email}</p>
        {user.profile && (
          <div className="flex justify-center gap-2 flex-wrap text-sm text-gray-700">
            <span className="bg-pink-100 px-3 py-1 rounded-full">
              Age: {user.profile.age}
            </span>
            <span className="bg-purple-100 px-3 py-1 rounded-full">
              {user.profile.gender}
            </span>
          </div>
        )}
        <p className="text-gray-600 mt-2 italic">{user.profile?.bio}</p>
      </div>

      {(onLike || onDislike) && (
        <div className="flex justify-around w-full mt-4">
          <button
            onClick={onDislike}
            className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 border hover:bg-gray-200 shadow"
          >
            ❌ Dislike
          </button>
          <button
            onClick={onLike}
            className="px-6 py-2 rounded-full bg-pink-500 text-white border hover:bg-pink-600 shadow"
          >
            💘 Like
          </button>
        </div>
      )}
    </div>
  );
}
