import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import MoodButton from "./components/MoodButton";

const MOODS = [
  { key: "happy", emoji: "😊", label: "Happy", color: "#F59E0B" },
  { key: "sad", emoji: "😢", label: "Sad", color: "#3B82F6" },
  { key: "tired", emoji: "😴", label: "Tired", color: "#8B5CF6" },
  { key: "excited", emoji: "🤩", label: "Excited", color: "#EC4899" },
  { key: "angry", emoji: "😡", label: "Angry", color: "#DC2626" },
];

const INITIAL_COUNTS = { happy: 0, sad: 0, tired: 0, excited: 0, angry: 0 };

export default function App() {
  const [counts, setCounts] = useState(INITIAL_COUNTS);

  const handleMoodPress = (moodKey) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [moodKey]: (prevCounts[moodKey] ?? 0) + 1,
    }));
  };

  const handleReset = () => {
    setCounts({ ...INITIAL_COUNTS });
  };

  const highestCount = Math.max(...MOODS.map((mood) => counts[mood.key] ?? 0));
  const totalCount = MOODS.reduce(
    (sum, mood) => sum + (counts[mood.key] ?? 0),
    0
  );

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Mood Tracker</Text>
        <Text style={styles.subtitle}>How are you feeling right now?</Text>

        <View style={styles.buttonGrid}>
          {MOODS.map((mood) => (
            <MoodButton
              key={mood.key}
              emoji={mood.emoji}
              label={mood.label}
              color={mood.color}
              onPress={() => handleMoodPress(mood.key)}
            />
          ))}
        </View>

        <View style={styles.countsBox}>
          <Text style={styles.countsTitle}>Your mood log</Text>
          {MOODS.map((mood) => {
            const count = counts[mood.key] ?? 0;
            const isTop = count > 0 && count === highestCount;
            return (
              <Text
                key={mood.key}
                style={[
                  styles.countText,
                  isTop && styles.topCountText,
                  isTop && { color: mood.color },
                ]}
              >
                {mood.emoji} {mood.label}: {count}
              </Text>
            );
          })}
          <Text style={styles.totalText}>Total: {totalCount}</Text>
        </View>

        <Pressable
          onPress={handleReset}
          style={({ pressed }) => [
            styles.resetButton,
            pressed && styles.resetPressed,
          ]}
        >
          <Text style={styles.resetText}>Reset</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#EEF2FF",
  },
  content: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#312E81",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginTop: 4,
    marginBottom: 12,
  },
  buttonGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  countsBox: {
    marginTop: 16,
    width: "100%",
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  countsTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    color: "#333",
  },
  countText: {
    fontSize: 18,
    color: "#444",
    marginVertical: 3,
  },
  topCountText: {
    fontSize: 28,
    fontWeight: "800",
  },
  totalText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#312E81",
  },
  resetButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 12,
    backgroundColor: "#312E81",
  },
  resetPressed: {
    opacity: 0.6,
    transform: [{ scale: 0.96 }],
  },
  resetText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});