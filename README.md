# Mood Tracker

A simple single-screen mobile app built with **React Native** and **Expo**. Tap a mood button to log how you feel, and watch a running count of each mood update live.

Built as a practice project covering components, props, state and basic styling.

## Features

- Five mood buttons: Happy, Sad, Tired, Excited and Angry
- A running count for each mood, updated on every tap
- A total count of all moods logged
- The most-selected mood appears larger and in its own color
- A Reset button that sets every count back to zero
- A scrollable screen, so everything is reachable on small phones
- Pressed-state feedback on every button

## Built With

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/) (SDK 57, blank template)
- JavaScript, with the `useState` hook for state

## Project Structure

```
mood-tracker/
├── App.js                  # Main screen: state, counts and layout
├── components/
│   └── MoodButton.js       # Reusable mood button component
├── assets/                 # Icons and splash images from the template
├── app.json                # Expo configuration
└── package.json            # Dependencies and scripts
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS or newer)
- [Git](https://git-scm.com/)
- The **Expo Go** app on your phone (Play Store or App Store), updated to the latest version

### Installation

1. Clone the repository:

```bash
   git clone https://github.com/Daboz-cell/mood-tracker.git
```

2. Move into the project folder:

```bash
   cd mood-tracker
```

3. Install the dependencies:

```bash
   npm install
```

4. Start the development server:

```bash
   npx expo start
```

5. Scan the QR code:
   - **Android:** open Expo Go and tap **Scan QR code**
   - **iPhone:** scan it with the Camera app and tap the banner

Your phone and computer must be on the same Wi-Fi network. If the app does not load, use tunnel mode instead:

```bash
npx expo start --tunnel
```

## How It Works

### MoodButton component

`MoodButton` is a reusable component that receives its data through props:

| Prop | Purpose |
|---|---|
| `emoji` | The emoji shown on the button |
| `label` | The mood name shown under the emoji |
| `color` | The border and label color for that mood |
| `onPress` | The function the parent runs when the button is tapped |

The component only displays things. The parent (`App.js`) decides what a tap does.

### State

`App.js` keeps all counts in one object using `useState`:

```js
const [counts, setCounts] = useState({
  happy: 0,
  sad: 0,
  tired: 0,
  excited: 0,
  angry: 0,
});
```

Each tap creates a **new object** with the spread operator, because React only re-renders when it sees a new object:

```js
setCounts((prevCounts) => ({
  ...prevCounts,
  [moodKey]: (prevCounts[moodKey] ?? 0) + 1,
}));
```

### One list drives the whole screen

The moods are defined once in a `MOODS` array. The buttons and the counts list are both built from it with `.map()`, so adding a new mood takes two small changes:

1. Add one object to `MOODS` in `App.js`.
2. Add the matching key to `INITIAL_COUNTS` in `App.js`.

### Highlighting the top mood

```js
const highestCount = Math.max(...MOODS.map((mood) => counts[mood.key] ?? 0));
const isTop = count > 0 && count === highestCount;
```

The `count > 0` check stops every mood from highlighting when all counts are zero. If two moods tie, both highlight.

### Reset

Reset replaces the state with a fresh copy of the starting values:

```js
setCounts({ ...INITIAL_COUNTS });
```

## Concepts Practiced

- Function components and props
- `useState` and updating object state immutably
- Rendering lists with `.map()` and `key`
- Conditional styling with style arrays
- `StyleSheet.create`, `Pressable` and `ScrollView`
- Fast Refresh and testing on a real device with Expo Go

## Troubleshooting

| Problem | Fix |
|---|---|
| App does not load after scanning | Check both devices are on the same Wi-Fi, or run `npx expo start --tunnel` |
| "Incompatible SDK version" in Expo Go | Update the Expo Go app on your phone |
| A count shows `NaN` after editing the code | Press **Reset** in the app, or press `r` in the terminal for a full reload |
| `npm install` shows vulnerability warnings | Normal for a fresh Expo project. Do not run `npm audit fix --force` |

## Ideas for Future Improvements

- Save the counts between sessions with AsyncStorage
- Add a date and time log of each mood entry
- Show a weekly chart of mood history
- Let users add their own custom moods

