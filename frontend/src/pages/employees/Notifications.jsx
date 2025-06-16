import React, { useState } from "react";

const dummyNotifications = [
  {
    notification_id: 1,
    user_id: 101,
    type: "leave",
    message: "Your leave has been approved.",
    is_read: false,
    created_at: "2024-06-10T10:00:00Z"
  },
  {
    notification_id: 2,
    user_id: 101,
    type: "transfer",
    message: "Your transfer request is pending.",
    is_read: true,
    created_at: "2024-06-12T09:00:00Z"
  }
];

function Notifications() {
  const [notifications] = useState(dummyNotifications);

  return (
    <>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow mt-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Notifications</h2>
        <ul className="space-y-4">
          {notifications.map((n) => (
            <li
              key={n.notification_id}
              className={`p-4 rounded border ${n.is_read ? "bg-gray-100" : "bg-blue-50 border-blue-300"}`}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{n.message}</span>
                <span className="text-xs text-gray-500">{new Date(n.created_at).toLocaleString()}</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">Type: {n.type}</div>
              <div className="text-xs text-gray-400">Status: {n.is_read ? "Read" : "Unread"}</div>
            </li>
          ))}
        </ul>
        {/* TODO: Integrate with real API */}
      </div>
    </>
  );
}

export default Notifications;
