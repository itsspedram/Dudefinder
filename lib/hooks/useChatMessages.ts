import { useEffect, useState, useRef } from 'react';
import { getSocket } from '@/lib/socket';

interface Message {
  id: string;
  senderId: string;
  matchId: string;
  text: string;
  createdAt: string;
  sender?: { id: string; name?: string | null };
}

interface MatchUser {
  name: string;
  age?: number;
}

export function useChatMessages(matchId: string) {
  const socket = getSocket();

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [matchUser, setMatchUser] = useState<MatchUser | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);


  useEffect(() => {
    if (!matchId) return;

    Promise.all([
      fetch(`/api/messages/${matchId}`).then(res => res.json()),
      fetch(`/api/matches/${matchId}`).then(res => res.json())
    ]).then(([messagesData, matchData]) => {
      setMessages(messagesData);
      setMatchUser(matchData.otherUser);
      setLoading(false);
    });

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
  }, [matchId,socket]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ matchId, text }),
    });
    const newMsg = await res.json();
    setMessages(msgs => [...msgs, newMsg]);
    getSocket().emit('message:new', { matchId, message: newMsg });
  };

  const emitTyping = () => {
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("typing", { matchId });
    }, 300); // 300ms debounce
  };

  return { messages, loading, isTyping, matchUser, sendMessage, emitTyping, bottomRef };
}
