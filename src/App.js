import React, { useState, useEffect } from "react";
import SignupPage from "./components/SignupPage";
import VotingPage from "./components/VotingPage";

function App() {
  const [user, setUser] = useState(null);
  const [videos, setVideos] = useState([]);

  // Initialize videos data
  useEffect(() => {
    const initialVideos = Array.from({ length: 27 }, (_, index) => ({
      id: index + 1,
      name: `Video ${index + 1}`,
      link: "",
      voters: [],
      votes: 0,
    }));
    setVideos(initialVideos);
  }, []);

  const handleSignup = (userName) => {
    setUser({ name: userName, votesRemaining: 5 });
  };

  const handleVote = (videoId) => {
    if (!user || user.votesRemaining <= 0) return;

    setVideos((prevVideos) =>
      prevVideos.map((video) => {
        if (video.id === videoId && !video.voters.includes(user.name)) {
          return {
            ...video,
            voters: [...video.voters, user.name],
            votes: video.votes + 1,
          };
        }
        return video;
      })
    );

    setUser((prevUser) => ({
      ...prevUser,
      votesRemaining: prevUser.votesRemaining - 1,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {!user ? (
        <SignupPage onSignup={handleSignup} />
      ) : (
        <VotingPage user={user} videos={videos} onVote={handleVote} />
      )}
    </div>
  );
}

export default App;
