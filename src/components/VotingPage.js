import React from "react";
import VideoCard from "./VideoCard";

const VotingPage = ({ user, videos, onVote }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Top Five Videos
          </h1>
          <div className="bg-white rounded-lg shadow-sm p-4 inline-block">
            <p className="text-lg text-gray-700">
              Welcome,{" "}
              <span className="font-semibold text-blue-600">{user.name}</span>!
            </p>
            <p className="text-sm text-gray-500 mt-1">
              You have{" "}
              <span className="font-semibold text-green-600">
                {user.votesRemaining}
              </span>{" "}
              votes remaining
            </p>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              user={user}
              onVote={onVote}
            />
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            How to vote:
          </h3>
          <ul className="text-blue-800 space-y-1">
            <li>
              • Click the video button to watch the video (opens in new tab)
            </li>
            <li>• Click the "Vote" button to vote for a video</li>
            <li>• You can vote for up to 5 videos total</li>
            <li>• Your name will appear below videos you've voted for</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VotingPage;
