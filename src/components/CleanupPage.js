import React, { useState } from "react";
import firebaseService from "../services/firebaseService";

const CleanupPage = () => {
  const [isClearing, setIsClearing] = useState(false);
  const [result, setResult] = useState(null);

  const handleClearData = async () => {
    if (
      !window.confirm(
        "Are you sure you want to clear ALL voting data? This cannot be undone!"
      )
    ) {
      return;
    }

    if (
      !window.confirm(
        "This will delete all users, votes, and video data. Are you absolutely sure?"
      )
    ) {
      return;
    }

    setIsClearing(true);
    setResult(null);

    try {
      const success = await firebaseService.clearAllData();
      if (success) {
        setResult(
          "✅ All data cleared successfully! The app will now start fresh."
        );
      } else {
        setResult("❌ Error clearing data. Check console for details.");
      }
    } catch (error) {
      setResult(`❌ Error: ${error.message}`);
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-red-600 mb-4">
            🗑️ Database Cleanup
          </h1>
          <p className="text-gray-600 mb-4">
            This will permanently delete ALL voting data including:
          </p>
          <ul className="text-left text-gray-600 space-y-1 mb-6">
            <li>• All user accounts</li>
            <li>• All votes cast</li>
            <li>• All video vote counts</li>
            <li>• All voting history</li>
          </ul>
          <p className="text-red-600 font-semibold">
            ⚠️ This action cannot be undone!
          </p>
        </div>

        <button
          onClick={handleClearData}
          disabled={isClearing}
          className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isClearing ? "Clearing Data..." : "Clear All Data"}
        </button>

        {result && (
          <div
            className={`mt-4 p-4 rounded-lg ${
              result.includes("✅")
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {result}
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            After clearing, refresh the page to see the clean app.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CleanupPage;
