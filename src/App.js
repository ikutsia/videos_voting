import React, { useState, useEffect } from "react";
import SignupPage from "./components/SignupPage";
import VotingPage from "./components/VotingPage";

function App() {
  const [user, setUser] = useState(null);
  const [videos, setVideos] = useState([]);

  // Initialize videos data
  useEffect(() => {
    const initialVideos = Array.from({ length: 27 }, (_, index) => {
      const videoId = index + 1;
      let link = "";

      // Add specific links for videos
      if (videoId === 1) {
        link =
          "https://www.pexels.com/video/luxury-yacht-floating-on-turquoise-waters-31187407/";
      } else if (videoId === 2) {
        link =
          "https://www.pexels.com/video/video-of-a-yacht-on-water-6205990/";
      } else if (videoId === 3) {
        link =
          "https://www.pexels.com/video/young-man-carrying-silver-platter-in-hotel-corridor-5371658/";
      } else if (videoId === 4) {
        link =
          "https://www.istockphoto.com/de/video/zwei-frauen-auf-paddelbrett-in-lagune-gm1201939801-344823519?utm_source=pexels&utm_medium=affiliate&utm_campaign=sponsored_video&utm_content=srp_inline_media&utm_term=luxury+travel";
      } else if (videoId === 5) {
        link =
          "https://www.pexels.com/video/footage-of-the-speed-boat-interior-4415852/";
      } else if (videoId === 6) {
        link =
          "https://www.istockphoto.com/de/video/paar-in-love-at-luxury-resort-on-romantic-summer-vacation-the-personal-relax-gm1148214883-310016418?utm_source=pexels&utm_medium=affiliate&utm_campaign=sponsored_video&utm_content=srp_inline_media&utm_term=luxury+travel";
      } else if (videoId === 7) {
        link = "https://www.pexels.com/video/resort-in-the-beach-4999373/";
      } else if (videoId === 8) {
        link =
          "https://www.istockphoto.com/de/video/frau-zu-fu%C3%9F-am-pool-eines-luxus-resort-gm1209606008-350061702?utm_source=pexels&utm_medium=affiliate&utm_campaign=sponsored_video&utm_content=srp_inline_media&utm_term=luxury+travel";
      } else if (videoId === 9) {
        link = "https://www.pexels.com/video/yachts-on-a-marina-7007131/";
      } else if (videoId === 10) {
        link = "https://www.pexels.com/video/aircrafts-on-runway-854203/";
      } else if (videoId === 11) {
        link = "https://www.pexels.com/video/a-man-inside-a-plane-6700089/";
      } else if (videoId === 12) {
        link =
          "https://www.pexels.com/video/a-woman-entering-a-doorway-5379126/";
      } else if (videoId === 13) {
        link =
          "https://www.pexels.com/video/a-sleek-sailing-boat-glides-over-the-tranquil-blue-waters-26796996/";
      } else if (videoId === 14) {
        link =
          "https://www.istockphoto.com/de/video/passagiere-die-in-einen-privatjet-einsteigen-mit-pilotenbegr%C3%BC%C3%9Fung-gm2161688896-582119482?irclickid=WnFXRZVM-xyKRVYSyGSToxW9UkpwgzxlBSHow80&irgwc=1&cid=IS&utm_medium=affiliate&utm_source=Coverr&clickid=WnFXRZVM-xyKRVYSyGSToxW9UkpwgzxlBSHow80&utm_term=search_page&utm_content=258824&irpid=1203981";
      } else if (videoId === 15) {
        link =
          "https://www.istockphoto.com/de/video/gl%C3%BCckliches-interrassisches-paar-und-h%C3%A4ndchen-haltend-mit-tanzen-im-urlaub-f%C3%BCr-den-gm2205500717-622887585?irclickid=WnFXRZVM-xyKRVYSyGSToxW9Ukpwgw2dBSHow80&irgwc=1&cid=IS&utm_medium=affiliate&utm_source=Coverr&clickid=WnFXRZVM-xyKRVYSyGSToxW9Ukpwgw2dBSHow80&utm_term=search_page&utm_content=258824&irpid=1203981";
      } else if (videoId === 16) {
        link =
          "https://www.istockphoto.com/de/video/zeitlupenaufnahme-eines-piloten-der-passagiere-im-privatjet-begr%C3%BC%C3%9Ft-gm1496193601-518940929";
      } else if (videoId === 17) {
        link = "https://coverr.co/videos/speeding-supercar-kicking-up-sand";
      } else if (videoId === 18) {
        link =
          "https://www.istockphoto.com/de/video/dubai-lifestyle-gm520079072-91578105";
      } else if (videoId === 19) {
        link =
          "https://www.istockphoto.com/de/video/anonymer-kellner-schenkt-elegant-champagner-auf-einem-pariser-balkon-mit-blick-auf-gm2184551832-603372938";
      } else if (videoId === 20) {
        link =
          "https://www.istockphoto.com/de/video/sunset-at-the-rooftop-bar-gm2209149999-626252588";
      } else if (videoId === 21) {
        link =
          "https://www.istockphoto.com/de/video/aerial-view-of-the-woman-in-dress-walking-in-desert-gm2176038968-595551956";
      } else if (videoId === 22) {
        link =
          "https://www.istockphoto.com/de/video/frau-in-einem-wei%C3%9Fen-kleid-tritt-wasser-beim-spaziergang-am-pool-bei-sonnenuntergang-gm1314088482-402382119";
      } else if (videoId === 23) {
        link =
          "https://www.istockphoto.com/de/video/frau-entspannt-sich-im-pool-im-luxusresort-gm1456889579-491793735";
      } else if (videoId === 24) {
        link =
          "https://www.istockphoto.com/de/video/mann-zu-fu%C3%9F-in-richtung-hubschrauber-gm482420876-70343065";
      } else if (videoId === 25) {
        link =
          "https://www.istockphoto.com/de/video/hubschrauber-pilot-f%C3%BChrt-passagiere-an-bord-gm1085249728-291130029";
      } else if (videoId === 26) {
        link =
          "https://www.istockphoto.com/de/video/hubschrauber-pilot-f%C3%BChrt-passagiere-hubschrauber-gm1085236858-291130024";
      } else if (videoId === 27) {
        link =
          "https://www.istockphoto.com/de/video/gesch%C3%A4ftsleute-die-h%C3%A4nde-sch%C3%BCtteln-mit-jet-gm104453604-9819202";
      }

      return {
        id: videoId,
        name: `Video ${videoId}`,
        link: link,
        voters: [],
        votes: 0,
      };
    });
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
