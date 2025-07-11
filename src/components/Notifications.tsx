import React, { useState } from 'react';
import { Bell } from 'lucide-react';

const initialNotifications = [
  { id: 'n1', message: 'Mint successful! You received Supporter Pass #1.', read: false, date: '2024-06-05' },
  { id: 'n2', message: 'Campaign update: New perk unlocked!', read: false, date: '2024-06-04' },
  { id: 'n3', message: 'Reminder: Campaign ending soon.', read: true, date: '2024-06-03' },
];

export const Notifications: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <div className="relative inline-block text-left">
      <button
        className="relative p-2 rounded-full hover:bg-bg-secondary transition-colors"
        onClick={() => setOpen((o) => !o)}
        aria-label="Notifications"
      >
        <Bell className="w-6 h-6 text-accent" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-bg-secondary rounded-xl shadow-cosmic z-50 border border-accent">
          <div className="p-4 border-b border-accent font-bold text-accent">Notifications</div>
          <ul className="max-h-64 overflow-y-auto">
            {notifications.length === 0 ? (
              <li className="p-4 text-center text-gray-400">No notifications</li>
            ) : notifications.map((n) => (
              <li
                key={n.id}
                className={`px-4 py-3 border-b border-bg-primary cursor-pointer ${n.read ? 'text-gray-400' : 'text-text-primary font-semibold'}`}
                onClick={() => markAsRead(n.id)}
              >
                <div className="flex justify-between items-center">
                  <span>{n.message}</span>
                  {!n.read && <span className="ml-2 w-2 h-2 bg-accent rounded-full inline-block"></span>}
                </div>
                <div className="text-xs text-gray-500 mt-1">{n.date}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}; 