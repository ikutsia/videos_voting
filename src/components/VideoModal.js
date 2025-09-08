import React, { useState } from "react";

const VideoModal = ({ isOpen, onClose, videoUrl, videoName }) => {
  const [embedFailed, setEmbedFailed] = useState(false);

  if (!isOpen) return null;

  // Function to check if URL can be embedded
  const canEmbed = (url) => {
    // Pexels videos can usually be embedded
    if (url.includes("pexels.com")) {
      return true;
    }

    // Coverr videos can usually be embedded
    if (url.includes("coverr.co")) {
      return true;
    }

    // iStock videos typically cannot be embedded due to security restrictions
    if (url.includes("istockphoto.com")) {
      return false;
    }

    // Default to false for unknown platforms
    return false;
  };

  const handleIframeError = () => {
    setEmbedFailed(true);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">{videoName}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Video Content */}
        <div className="p-4">
          {!canEmbed(videoUrl) || embedFailed ? (
            /* Fallback for non-embeddable videos */
            <div className="aspect-video bg-gray-100 rounded-lg flex flex-col items-center justify-center p-8">
              <div className="text-center">
                <div className="text-6xl mb-4">🎥</div>
                <h4 className="text-lg font-semibold text-gray-700 mb-2">
                  Video Preview Not Available
                </h4>
                <p className="text-gray-600 mb-4">
                  This video cannot be embedded due to platform restrictions.
                </p>
                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
                >
                  <span className="mr-2">▶</span>
                  Watch Video in New Tab
                </a>
              </div>
            </div>
          ) : (
            /* Embeddable video */
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <iframe
                src={videoUrl}
                title={videoName}
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; fullscreen; picture-in-picture"
                onError={handleIframeError}
              />
            </div>
          )}

          {/* Info message */}
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Tip:</strong> You can always{" "}
              <a
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                open the video in a new tab
              </a>{" "}
              if you prefer.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
