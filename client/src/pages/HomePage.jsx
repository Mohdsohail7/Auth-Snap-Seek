import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import LoadingScreen from "../components/LoadingScreen";
import TopSearchesBanner from "../components/TopSearchesBanner";
import AuthButton from "../components/AuthButton";
import SearchBar from "../components/SearchBar";
import ImageGrid from "../components/ImageGrid";
import HistorySidebar from "../components/HistorySidebar";

export default function HomePage() {
  const { user, loading, logout } = useContext(AuthContext);
  const [lastSearch, setLastSearch] = useState(null);
  const [selected, setSelected] = useState([]);
  const [searching, setSearching] = useState(false);

  if (loading) {
    return <LoadingScreen message="Loading user data..." />;
  }

  return (
    <div className="relative min-h-screen p-6 font-sans bg-gray-50">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
        <h1 className="text-3xl font-bold text-gray-800">Auth Snap Seek</h1>

        {user && (
          <div className="flex items-center gap-4">
            {/* Avatar */}
            {user.avatar && (
              <img
                src={user.avatar}
                alt="User avatar"
                className="w-10 h-10 rounded-full border border-gray-300"
              />
            )}

            {/* Name + Email */}
            <div className="flex flex-col">
              <span className="text-gray-800 font-semibold leading-tight">
                {user.displayName || 'User'}
              </span>
              <span className="text-sm text-gray-500 truncate max-w-[180px]">
                {user.email || 'No email'}
              </span>
            </div>

            {/* Logout Button */}
            <button
              onClick={() => logout()}
              className="px-4 py-1 rounded-md bg-red-500 text-white text-sm hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        )}
      </header>

      {/* Initial Home / Login Screen */}
      {!user ? (
        <div className="flex flex-col items-center justify-center mt-20 space-y-6">
          <h2 className="text-xl text-gray-700 font-medium text-center">
            Welcome to Image Search
          </h2>
          <p className="text-gray-500 text-center max-w-md">
            Log in using one of the providers below to start searching for
            amazing images.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <AuthButton />
          </div>
          <div className="w-full max-w-xl mt-6">
            <TopSearchesBanner />
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1 relative">
            <SearchBar
              onResults={(data) => {
                setLastSearch(data);
                setSelected([]);
                setSearching(false);
              }}
              setSearching={setSearching}
            />

            {lastSearch && (
              <div className="mt-4 space-y-2">
                <div className="font-semibold text-gray-700">
                  You searched for “{lastSearch.term}” — {lastSearch.count}{" "}
                  results.
                </div>
                <div className="text-sm text-gray-600">
                  Selected: {selected.length} images
                </div>
                <ImageGrid
                  images={lastSearch.results}
                  selected={selected}
                  setSelected={setSelected}
                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80">
            <HistorySidebar />
          </div>
        </div>
      )}

      {/* Full-page search spinner overlay */}
      {searching && (
        <div className="absolute inset-0 bg-gray-100 bg-opacity-70 flex items-center justify-center z-50">
          <LoadingScreen message="Searching images..." />
        </div>
      )}
    </div>
  );
}
