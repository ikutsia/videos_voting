import React, { useState } from "react";
import VideoCard from "./VideoCard";
import VideoModal from "./VideoModal";
import firebaseService from "../services/firebaseService";

const VotingPage = ({ user, videos, onVote, onVideoClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [allUsersVotes, setAllUsersVotes] = useState([]);
  const [loadingResults, setLoadingResults] = useState(false);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  const handleShowResults = async () => {
    setLoadingResults(true);
    try {
      const results = await firebaseService.getAllUsersVotes();
      setAllUsersVotes(results);
      setShowResults(true);
    } catch (error) {
      console.error("Error loading results:", error);
    } finally {
      setLoadingResults(false);
    }
  };

  const handleHideResults = () => {
    setShowResults(false);
  };
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
              onVideoClick={handleVideoClick}
            />
          ))}
        </div>

        {/* Show Results Button */}
        <div className="mt-12 text-center">
          <button
            onClick={handleShowResults}
            disabled={loadingResults}
            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingResults ? "Loading..." : "Show Results"}
          </button>
        </div>

        {/* Results Summary Modal */}
        {showResults && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-900">
                  Voting Results Summary
                </h2>
                <button
                  onClick={handleHideResults}
                  className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              {/* Results Content */}
              <div className="p-6">
                {allUsersVotes.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No votes recorded yet.
                  </p>
                ) : (
                  <div className="space-y-8">
                    {/* Video Rankings */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        🏆 Video Rankings
                      </h3>
                      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
                        {(() => {
                          // Create ranking from current videos data
                          const videoRankings = videos
                            .map((video) => ({
                              id: video.id,
                              name: video.name,
                              votes: video.votes,
                              voters: video.voters,
                            }))
                            .sort((a, b) => b.votes - a.votes)
                            .slice(0, 5); // Top 5

                          return videoRankings.length > 0 ? (
                            <div className="space-y-3">
                              {videoRankings.map((video, index) => (
                                <div
                                  key={video.id}
                                  className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm"
                                >
                                  <div className="flex items-center space-x-3">
                                    <div
                                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                                        index === 0
                                          ? "bg-yellow-500"
                                          : index === 1
                                          ? "bg-gray-400"
                                          : index === 2
                                          ? "bg-orange-600"
                                          : "bg-blue-500"
                                      }`}
                                    >
                                      {index + 1}
                                    </div>
                                    <div>
                                      <span className="font-semibold text-gray-900">
                                        {video.name}
                                      </span>
                                      <div className="text-sm text-gray-600">
                                        {video.voters.length > 0 ? (
                                          <span>
                                            Voted by: {video.voters.join(", ")}
                                          </span>
                                        ) : (
                                          <span>No votes yet</span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-2xl font-bold text-gray-900">
                                      {video.votes}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      votes
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-500 text-center py-4">
                              No votes recorded yet.
                            </p>
                          );
                        })()}
                      </div>
                    </div>

                    {/* Individual User Votes */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        👥 Individual Votes
                      </h3>
                      <div className="space-y-4">
                        {allUsersVotes.map((user) => (
                          <div
                            key={user.id}
                            className="border border-gray-200 rounded-lg p-4"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="text-lg font-semibold text-gray-900">
                                {user.name}
                              </h4>
                              <span className="text-sm text-gray-500">
                                {user.votesRemaining} votes remaining
                              </span>
                            </div>

                            {user.votedVideos.length > 0 ? (
                              <div>
                                <p className="text-sm text-gray-600 mb-2">
                                  Voted for:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {user.votedVideos.map((videoId) => (
                                    <span
                                      key={videoId}
                                      className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                                    >
                                      Video {videoId}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <p className="text-sm text-gray-500">
                                No votes yet
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end p-6 border-t">
                <button
                  onClick={handleHideResults}
                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            How to vote:
          </h3>
          <ul className="text-blue-800 space-y-1">
            <li>
              • Click the video button to watch the video (opens in popup)
            </li>
            <li>• Click the "Vote" button to vote for a video</li>
            <li>• You can vote for up to 5 videos total</li>
            <li>• Your name will appear below videos you've voted for</li>
          </ul>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        videoUrl={selectedVideo?.link}
        videoName={selectedVideo?.name}
      />
    </div>
  );
};

export default VotingPage;
