import React from "react";

const VideoCard = ({ video, user, onVote }) => {
  const hasVoted = video.voters.includes(user.name);
  const canVote = user.votesRemaining > 0 && !hasVoted;

  const handleVote = () => {
    if (canVote) {
      onVote(video.id);
    }
  };

  const handleVideoClick = (e) => {
    if (video.link) {
      e.preventDefault();
      window.open(video.link, "_blank");
    }
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ${
        hasVoted ? "ring-2 ring-green-500 bg-green-50" : ""
      } ${canVote ? "cursor-pointer hover:scale-105" : ""}`}
    >
      <div className="p-6">
        {/* Video Header */}
        <div className="flex justify-between items-start mb-4">
          <span className="text-sm text-gray-500">#{video.id}</span>
        </div>

        {/* Video Button */}
        <div className="mb-4">
          <button
            onClick={handleVideoClick}
            disabled={!video.link}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-lg transition-all ${
              video.link
                ? "bg-orange-500 text-white hover:bg-orange-600 hover:scale-105 cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {video.name}
          </button>
        </div>

        {/* Vote Button */}
        <div className="mb-4">
          <button
            onClick={handleVote}
            disabled={!canVote}
            className={`w-full py-2 px-4 rounded-md font-medium transition-all ${
              hasVoted
                ? "bg-green-100 text-green-800 border border-green-300"
                : canVote
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {hasVoted ? "✓ Voted" : canVote ? "Vote" : "No votes left"}
          </button>
        </div>

        {/* Vote Count */}
        <div className="text-center mb-3">
          <span className="text-2xl font-bold text-gray-700">
            {video.votes}
          </span>
          <span className="text-sm text-gray-500 ml-1">votes</span>
        </div>

        {/* Voters List */}
        {video.voters.length > 0 && (
          <div className="border-t pt-3">
            <p className="text-xs text-gray-500 mb-2">Voted by:</p>
            <div className="flex flex-wrap gap-1">
              {video.voters.map((voter, index) => (
                <span
                  key={index}
                  className={`inline-block px-2 py-1 rounded-full text-xs ${
                    voter === user.name
                      ? "bg-blue-100 text-blue-800 font-medium"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {voter}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCard;
