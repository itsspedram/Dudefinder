'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Spinner from '@/components/Spinner';
import Button from '@/components/Button';
import { useChatMessages } from '@/lib/hooks/useChatMessages';

export default function ChatPage() {
  const { matchId } = useParams();
  const { data: session } = useSession();
  const [text, setText] = useState('');

  const {
    messages,
    loading,
    isTyping,
    matchUser,
    sendMessage,
    emitTyping,
    bottomRef
  } = useChatMessages(matchId as string);

  const handleSend = () => {
    if (text.trim()) {
      sendMessage(text);
      setText('');
    }
  };

  if (loading) return <div className="flex justify-center mt-20"><Spinner /></div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-2">💬 Chat</h2>

      {matchUser && (
        <div className='flex items-center mb-4'>
                <div className="text-lg font-medium  text-gray-700">
          Talking to <span className="text-pink-600">{matchUser.name}</span>
          {matchUser.age ? `, Age ${matchUser.age}` : null}
        </div>
        {isTyping && (
          <div className="text-sm text-gray-500 italic ml-2">Typing...</div>
        )}</div>

      )}

      <div className="border rounded-lg p-4 h-96 overflow-y-auto bg-gray-50">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`mb-2 max-w-xs px-4 py-2 rounded-xl text-sm ${
              msg.senderId === session?.user.id
                ? 'bg-pink-500 text-white ml-auto'
                : 'bg-white text-gray-800'
            }`}
          >
            <p>{msg.text}</p>
            <span className="block text-xs text-right mt-1 opacity-60">
              {new Date(msg.createdAt).toLocaleTimeString()}
            </span>
          </div>
        ))}



        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2 mt-4">
        <input
          className="flex-1 p-2 border rounded"
          value={text}
          onChange={e => {
            setText(e.target.value);
            emitTyping();
          }}
          placeholder="Type a message..."
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
}
