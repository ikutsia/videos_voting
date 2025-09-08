# Video Voting App

A simple React application for coworkers to vote on their top 5 favorite videos from a collection of 27 video links.

## Features

- **User Registration**: Simple signup with just a name
- **27 Video Cards**: Each card can hold a video link and track votes
- **Voting System**: Each user can vote for up to 5 videos
- **Voter Display**: Shows who voted for each video
- **Link Management**: Add/edit video URLs for each card
- **Responsive Design**: Works on desktop and mobile devices

## How to Use

1. **Sign Up**: Enter your name to get started
2. **Vote**: Click on video cards to vote (maximum 5 votes per user)
3. **Add Links**: Click "Edit Link" on any card to add a video URL
4. **View Results**: See vote counts and voter names for each video

## Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Technologies Used

- React 18
- Tailwind CSS for styling
- Local state management (no backend required)

## Project Structure

```
src/
├── components/
│   ├── SignupPage.js    # User registration
│   ├── VotingPage.js    # Main voting interface
│   └── VideoCard.js     # Individual video card component
├── App.js              # Main app component
├── index.js            # App entry point
└── index.css           # Global styles with Tailwind
```

## Customization

- Modify the number of videos by changing the array length in `App.js`
- Update styling by modifying Tailwind classes
- Add more user information in the signup process if needed
