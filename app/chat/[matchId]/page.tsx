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

  useEffect(() => {
    if (!matchId) return;

    // Initial load
    fetch(`/api/messages/${matchId}`)
      .then(res => res.json())
      .then(data => {
        setMessages(data);
        setLoading(false);
      });

    const socket = getSocket();
    socket.emit('join', matchId);

    socket.on('message:new', (message: Message) => {
      setMessages(msgs => [...msgs, message]);
    });

    return () => {
      socket.off('message:new');
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
      <h2 className="text-2xl font-bold mb-4">💬 Chat</h2>
      <div className="border rounded-lg p-4 h-96 overflow-y-auto bg-gray-50">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`mb-2 max-w-xs px-4 py-2 rounded-xl text-sm ${msg.senderId === session?.user.id ? 'bg-pink-500 text-white ml-auto' : 'bg-white text-gray-800'}`}
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
          onChange={e => setText(e.target.value)}
          placeholder="Type a message..."
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
}
