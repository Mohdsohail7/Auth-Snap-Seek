import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { loginUrls, logoutUser } from '../api/apis';

console.log("Backend URL:", process.env.REACT_APP_BACKEND_URL);


export default function AuthButton() {
  const { user, refresh } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logoutUser();
      refresh();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-wrap gap-3 justify-center">
        <a href={loginUrls.google}>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition">
            Login with Google
          </button>
        </a>
        <a href={loginUrls.github}>
          <button className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg shadow transition">
            Login with GitHub
          </button>
        </a>
        <a href={loginUrls.facebook}>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition">
            Login with Facebook
          </button>
        </a>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 bg-white p-3 rounded-lg shadow-md">
      <img
        src={user.avatar}
        alt="User avatar"
        className="w-10 h-10 rounded-full border"
      />
      <span className="font-medium text-gray-800">{user.displayName}</span>
      <button
        onClick={handleLogout}
        className="ml-auto bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md transition"
      >
        Logout
      </button>
    </div>
  );
}
