'use client';

import { useState, useEffect, useRef } from 'react';

interface Room {
  id: string;
  name: string;
  participants: number;
}

interface Message {
  id: string;
  roomId: string;
  userId: string;
  username: string;
  content: string;
  timestamp: string;
}

export default function CommunityPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [newRoomName, setNewRoomName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>(() => sessionStorage.getItem('userId') || '');
  const [username, setUsername] = useState<string>(() => sessionStorage.getItem('username') || '');
  const [isUserSelected, setIsUserSelected] = useState<boolean>(() => Boolean(sessionStorage.getItem('username')));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch active rooms
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('/api/community');
        if (!response.ok) throw new Error('Failed to fetch rooms');
        const data: Room[] = await response.json();
        setRooms(data);
      } catch (err) {
        console.error('Error fetching rooms:', err);
      }
    };
    fetchRooms();
  }, []);

  // Fetch messages when room is selected
  useEffect(() => {
    let isMounted = true;

    const fetchMessages = async () => {
      if (!selectedRoom || !isMounted) return;
      try {
        const response = await fetch(`/api/community?roomId=${selectedRoom}`);
        if (!response.ok) throw new Error('Failed to fetch messages');
        const data: Message[] = await response.json();
        setMessages(prev => {
          if (prev.length !== data.length) return data;
          const last = data[data.length - 1];
          const prevLast = prev[prev.length - 1];
          return last?.id !== prevLast?.id ? data : prev;
        });
        setError(null);
      } catch (err) {
        console.error('Error fetching messages:', err);
        setError('Failed to load messages');
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [selectedRoom]);

  const createRoom = async () => {
    if (!newRoomName.trim()) return;
    try {
      const response = await fetch('/api/community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'CREATE_ROOM', name: newRoomName }),
      });
      if (!response.ok) throw new Error('Failed to create room');
      const room: Room = await response.json();
      setRooms(prev => [...prev, room]);
      setNewRoomName('');
    } catch (err) {
      console.error('Error creating room:', err);
    }
  };

  const joinRoom = async (roomId: string) => {
    try {
      const response = await fetch('/api/community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'UPDATE_PARTICIPANTS', roomId, change: 1 }),
      });
      if (!response.ok) throw new Error('Failed to update participants');
      const updated: Room = await response.json();
      setRooms(prev => prev.map(r => (r.id === roomId ? updated : r)));
      setSelectedRoom(roomId);
    } catch (err) {
      console.error('Error joining room:', err);
    }
  };

  const leaveRoom = async () => {
    if (!selectedRoom) return;
    try {
      const response = await fetch('/api/community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'UPDATE_PARTICIPANTS', roomId: selectedRoom, change: -1 }),
      });
      if (!response.ok) throw new Error('Failed to update participants');
      const updated: Room = await response.json();
      setRooms(prev => prev.map(r => (r.id === selectedRoom ? updated : r)));
      setSelectedRoom(null);
      setMessages([]);
    } catch (err) {
      console.error('Error leaving room:', err);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedRoom) return;
    try {
      const response = await fetch('/api/community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'SEND_MESSAGE', roomId: selectedRoom, userId, username, content: newMessage }),
      });
      if (!response.ok) throw new Error('Failed to send message');
      const msg: Message = await response.json();
      setMessages(prev => [...prev, msg]);
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
      alert('Failed to send message. Please try again.');
    }
  };

  if (!isUserSelected) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
        <div className="bg-white/60 p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4">Select User</h2>
          <div className="space-y-4">
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full p-2 border rounded-2xl"
            />
            <button
              onClick={() => {
                if (username.trim()) {
                  const newUserId = `user_${Date.now()}`;
                  setUserId(newUserId);
                  setIsUserSelected(true);
                  sessionStorage.setItem('userId', newUserId);
                  sessionStorage.setItem('username', username);
                }
              }}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-600"
            >
              Join Chat
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 relative">
      {!selectedRoom ? (
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl mb-6">Community Chat Rooms</h1>
          <div className="bg-white/60 p-8 rounded-2xl shadow mb-6">
            <h2 className="text-xl mb-4">Create New Room</h2>
            <div className="flex gap-2">
              <input
                type="text"
                value={newRoomName}
                onChange={e => setNewRoomName(e.target.value)}
                placeholder="Enter room name"
                className="flex-1 p-3 border rounded-2xl"
              />
              <button onClick={createRoom} className="bg-violet-500 text-white px-4 py-1.5 rounded-xl">
                Create Room
              </button>
            </div>
          </div>
          <div className="bg-white/60 rounded-2xl shadow p-8">
            <h2 className="text-xl mb-4">Active Rooms</h2>
            <div className="space-y-2">
              {rooms.map(room => (
                <div
                  key={room.id}
                  className="flex items-center justify-between border p-3 rounded-2xl hover:bg-purple-200 cursor-pointer"
                  onClick={() => joinRoom(room.id)}
                >
                  <div>
                    <h3 className="font-medium">{room.name}</h3>
                    <p className="text-sm text-gray-500">{room.participants} participants</p>
                  </div>
                  <button className="bg-violet-500 text-white px-4 py-2 rounded-xl">Join</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/60 rounded-2xl shadow">
            <div className="border-b p-4 flex justify-between items-center">
              <h2 className="text-lg bg-violet-200 rounded-full px-4 py-2 text-violet-500">
                {rooms.find(r => r.id === selectedRoom)?.name} | {' '}
                {rooms.find(r => r.id === selectedRoom)?.participants} participants
              </h2>
              <button onClick={leaveRoom} className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600">
                Leave Room
              </button>
            </div>
            <div className="h-[67vh] overflow-y-auto p-4 space-y-4">
              {error && <div className="text-red-500 text-center p-4">{error}</div>}
              {messages.length === 0 ? (
                <div className="text-center text-gray-400">No messages yet</div>
              ) : (
                messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex flex-col ${message.userId === userId ? 'items-end' : 'items-start'}`}
                  >
                    <span className="text-xs text-gray-500 mb-1">{message.username}</span>
                    <div
                      className={`py-2 px-3 rounded-lg whitespace-pre-wrap break-words max-w-[80%] ${
                        message.userId === userId ? 'bg-violet-500 text-white ml-auto' : 'bg-gray-100'
                      }`}
                    >
                      {message.content}
                    </div>
                    <span className="text-xs text-gray-500 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="border-t p-4">
              <div className="flex gap-2">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full p-4 pr-20 border rounded-2xl focus:ring-1 focus:ring-violet-400 focus:outline-none"
                    onKeyPress={e => { if (e.key === 'Enter') sendMessage(); }}
                  />
                  <button
                    onClick={sendMessage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-violet-500 text-white px-4 py-1.5 rounded-xl"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
