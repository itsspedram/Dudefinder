'use client';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Spinner from '@/components/Spinner';
import Button from '@/components/Button';
import { getSocket } from '@/lib/socket';

interface Message {
  id: string;
  senderId: string;
  matchId: string;
  text: string;
  createdAt: string;
  sender?: { id: string; name?: string | null };
}

export default function ChatPage() {
  const { data: session } = useSession();
  const { matchId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [matchUser, setMatchUser] = useState<{ name: string; age?: number } | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!matchId) return;

    fetch(`/api/messages/${matchId}`)
      .then(res => res.json())
      .then(data => {
        setMessages(data);
        setLoading(false);
      });

    // 🔥 Fetch match info
    fetch(`/api/matches/${matchId}`)
      .then(res => res.json())
      .then(data => setMatchUser(data.otherUser));

    const socket = getSocket();
    socket.emit('join', matchId);

    socket.on('message:new', (message: Message) => {
      setMessages(msgs => [...msgs, message]);
    });

    socket.on('typing', () => {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    });

    return () => {
      socket.off('message:new');
      socket.off('typing');
    };
  }, [matchId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!text.trim()) return;

    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ matchId, text }),
    });

    const newMsg = await res.json();
    setMessages(msgs => [...msgs, newMsg]);
    setText('');

    getSocket().emit('message:new', { matchId, message: newMsg });
  };

  if (loading) return <div className="flex justify-center mt-20"><Spinner /></div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-2">💬 Chat</h2>

      {matchUser && (
        <div className="text-lg font-medium mb-4 text-gray-700">
          Talking to <span className="text-pink-600">{matchUser.name}</span>
          {matchUser.age ? `, Age ${matchUser.age}` : null}
        </div>
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

        {isTyping && (
          <div className="text-sm text-gray-500 italic mt-2 ml-2">Typing...</div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2 mt-4">
        <input
          className="flex-1 p-2 border rounded"
          value={text}
          onChange={e => {
            setText(e.target.value);
            getSocket().emit('typing', { matchId });
          }}
          placeholder="Type a message..."
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
}
