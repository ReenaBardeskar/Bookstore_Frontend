import React, { useEffect } from "react";
import "./notification.css"; // Add styles for the notification

const Notification = ({ message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 1500); // Hide the notification after 5 seconds

      return () => clearTimeout(timer); // Cleanup timer on component unmount
    }
  }, [message, onClose]);

  if (!message) return null;

  return <div className="notification">{message}</div>;
};

export default Notification;
