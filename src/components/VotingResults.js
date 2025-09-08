import React, { useState, useEffect } from "react";
import firebaseService from "../services/firebaseService";

const VotingResults = () => {
  const [usersVotes, setUsersVotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsersVotes = async () => {
      try {
        const votes = await firebaseService.getAllUsersVotes();
        setUsersVotes(votes);
      } catch (error) {
        console.error("Error loading users votes:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUsersVotes();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Loading voting results...
        </h3>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Voting Results by User
      </h3>

      {usersVotes.length === 0 ? (
        <p className="text-gray-500">No votes recorded yet.</p>
      ) : (
        <div className="space-y-4">
          {usersVotes.map((user) => (
            <div
              key={user.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900">{user.name}</h4>
                <span className="text-sm text-gray-500">
                  {user.votesRemaining} votes remaining
                </span>
              </div>

              {user.votedVideos.length > 0 ? (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Voted for:</p>
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
                <p className="text-sm text-gray-500">No votes yet</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VotingResults;
